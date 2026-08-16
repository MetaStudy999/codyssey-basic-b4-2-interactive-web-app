# B4-2 R01 — Reference Build

## Source of Truth

1. `b4-2-mission.pdf`
2. `b4-2-mission.md`
3. `b4-2-evaluation.md`

## Reference 서비스

**학습 카드(Study Cards) React SPA**

- React 18 + Vite
- React Router
- Supabase remote `items` CRUD
- controlled form
- reusable state UI
- custom hooks
- Vercel/Netlify deployment plan

## Routes

- `/`
- `/items`
- `/items/new`
- `/items/:id`
- `/items/:id/edit`
- `/about`
- `*` Not Found

## 재사용 컴포넌트

`Button`, `Input`, `TextArea`, `Card`, `LoadingState`, `ErrorState`, `EmptyState`, `Layout`, `ItemCard`, `ItemForm` — 10개.

## 상태/비동기 설계

- controlled form: `ItemForm`
- list/detail data + loading/error: `useItems`, `useItemDetail`
- common loading/error/empty components
- state→render:
  1. 검색어 → filtered list
  2. form input → preview
  3. submitting → disabled/저장 중 UI
  4. remote loading/error/data → state UI

## Remote CRUD

`src/lib/items.js`에서 Supabase를 통해 select/insert/update/delete합니다. 로컬 배열은 Source of Truth로 사용하지 않습니다.

Supabase 설정:

- `.env.example`
- `supabase-schema.sql`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

실제 `.env`와 privileged key는 Git에 저장하지 않습니다.

## 검증/학습 자료

- `reference/README.md`
- `environment/{README,setup,verify,reset}.sh/md`
- `docs/requirements-mapping.md`
- `docs/evaluation-qa.md`
- `evidence/README.md`
- `REFERENCE-STATUS.md`

## Runtime 전용

다음은 Phase C 실제 결과 없이는 PASS하지 않습니다.

- 실제 Supabase project/schema/policy
- 실제 remote CRUD
- 실제 loading/error/empty/validation/submitting browser UX
- actual production build
- 실제 Vercel/Netlify environment variables
- 실제 외부 URL
- deployed CRUD 전체 흐름

## 판정

**Reference 핵심 기준본 준비 완료 / Runtime Mission 상태 ⬜ NOT STARTED / CLEAR 아님**
