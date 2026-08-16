#!/usr/bin/env bash
set -u

ROUND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_DIR="$ROUND_DIR/reference"
PASS=0
FAIL=0
pass(){ printf '[PASS] %s\n' "$1"; PASS=$((PASS+1)); }
fail(){ printf '[FAIL] %s\n' "$1"; FAIL=$((FAIL+1)); }

for path in \
  "$REF_DIR/package.json" \
  "$REF_DIR/.env.example" \
  "$REF_DIR/supabase-schema.sql" \
  "$REF_DIR/src/main.jsx" \
  "$REF_DIR/src/App.jsx" \
  "$REF_DIR/src/hooks/useItems.js" \
  "$REF_DIR/src/hooks/useItemDetail.js" \
  "$REF_DIR/src/lib/supabase.js" \
  "$REF_DIR/src/lib/items.js" \
  "$REF_DIR/src/components/ui.jsx" \
  "$REF_DIR/src/components/Layout.jsx" \
  "$REF_DIR/src/components/ItemCard.jsx" \
  "$REF_DIR/src/components/ItemForm.jsx"
do
  [[ -f "$path" ]] && pass "file exists: ${path#$ROUND_DIR/}" || fail "missing: ${path#$ROUND_DIR/}"
done

ROUTES=$(grep -c '<Route ' "$REF_DIR/src/App.jsx" || true)
[[ "$ROUTES" -ge 6 ]] && pass "six or more route declarations" || fail "six or more route declarations"

grep -q 'path="\*"' "$REF_DIR/src/App.jsx" && pass "Not Found route" || fail "Not Found route"

UI_COUNT=$(grep -hE '^export function ' \
  "$REF_DIR/src/components/ui.jsx" \
  "$REF_DIR/src/components/Layout.jsx" \
  "$REF_DIR/src/components/ItemCard.jsx" \
  "$REF_DIR/src/components/ItemForm.jsx" | wc -l | tr -d ' ')
[[ "$UI_COUNT" -ge 8 ]] && pass "eight or more reusable components" || fail "eight or more reusable components"

grep -q 'useEffect' "$REF_DIR/src/hooks/useItems.js" && pass "custom hook uses useEffect" || fail "custom hook uses useEffect"
grep -q 'useEffect' "$REF_DIR/src/hooks/useItemDetail.js" && pass "detail hook uses useEffect" || fail "detail hook uses useEffect"

grep -q "supabase.from(TABLE).insert" "$REF_DIR/src/lib/items.js" && pass "remote create" || fail "remote create"
grep -q "\.update(" "$REF_DIR/src/lib/items.js" && pass "remote update" || fail "remote update"
grep -q "\.delete(" "$REF_DIR/src/lib/items.js" && pass "remote delete" || fail "remote delete"

grep -q 'submitting ?' "$REF_DIR/src/components/ItemForm.jsx" && pass "submit pending UI" || fail "submit pending UI"
grep -q 'nextErrors' "$REF_DIR/src/components/ItemForm.jsx" && pass "required field validation" || fail "required field validation"

if grep -R -nE '(service_role|SUPABASE_SERVICE_ROLE|sk-[A-Za-z0-9_-]{20,})' "$REF_DIR/src" >/dev/null 2>&1; then
  fail "no obvious privileged/secret key patterns in frontend source"
else
  pass "no obvious privileged/secret key patterns in frontend source"
fi

if command -v npm >/dev/null 2>&1 && [[ -d "$REF_DIR/node_modules" ]]; then
  (cd "$REF_DIR" && npm run build >/dev/null 2>&1) && pass "Vite production build" || fail "Vite production build"
else
  printf '[INFO] npm/node_modules not ready; production build deferred to Phase C\n'
fi

printf 'Result: %d PASS / %d FAIL\n' "$PASS" "$FAIL"
[[ "$FAIL" -eq 0 ]]
