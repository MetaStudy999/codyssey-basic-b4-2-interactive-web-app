#!/usr/bin/env bash
set -euo pipefail

ROUND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_DIR="$ROUND_DIR/reference"
cd "$REF_DIR"

npm install
if [[ ! -f .env ]]; then
  cp .env.example .env
  printf '[INFO] Created .env from .env.example. Fill Supabase values locally; do not commit .env.\n'
fi
printf '[PASS] B4-2 local dependencies prepared.\n'
