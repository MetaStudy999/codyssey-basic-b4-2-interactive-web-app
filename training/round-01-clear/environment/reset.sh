#!/usr/bin/env bash
set -euo pipefail

ROUND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_DIR="$ROUND_DIR/reference"

rm -rf "$REF_DIR/node_modules" "$REF_DIR/dist"
printf '[PASS] Removed only B4-2 local node_modules/dist artifacts.\n'
printf '[INFO] .env is intentionally preserved because it may contain local runtime values.\n'
