# B4-2 R01 — Reference Build

## 목적

공식 Mission/Evaluation을 기준으로 **React SPA + Supabase 원격 데이터 CRUD + routing + reusable component + custom hook + loading/error/empty/form UX + 외부 배포** Reference를 준비합니다.

Phase A에서는 실제 Supabase project/URL/key, 실제 원격 CRUD, 실제 Vercel/Netlify 배포를 완료했다고 간주하지 않습니다.

## Source of Truth

1. `b4-2-mission.pdf`
2. `b4-2-mission.md`
3. `b4-2-evaluation.md`

## Reference 설계

- React + Vite
- React Router
- Supabase
- Domain: `items` (학습 카드)
- Routes:
  - `/`
  - `/items`
  - `/items/:id`
  - `/items/new`
  - `/items/:id/edit`
  - `/profile`
  - `*` Not Found
- Reusable components 8+
- `useItems()` / `useItemDetail()` custom hooks
- controlled form + required validation + submit state
- loading/error/empty reusable states
- Remote CRUD only; local array를 source of truth로 사용하지 않음
- Client env:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Service Role Key는 Frontend/GitHub 금지

## Reference Complete Path

1. React/Vite setup
2. routes/layout/nav
3. reusable UI components
4. Supabase client/table
5. list/detail hooks
6. create/update forms
7. delete flow
8. loading/error/empty UX
9. static verify
10. actual Supabase CRUD Runtime
11. external deployment Runtime
12. Evidence/Evaluation/CLEAR

## 현재 판정

**Reference Build 진행 중 / Mission 상태 ⬜ NOT STARTED / Supabase·배포 Runtime 미시작**
