# B4-2 Reference — React Study Cards SPA

공식 B4-2 Mission/Evaluation을 기준으로 만든 **React + Supabase 원격 CRUD Reference**입니다. 실제 Supabase project와 외부 배포 URL은 Phase C에서만 확정합니다.

## 서비스 주제

`items` 테이블에 학습 카드를 저장합니다.

- title
- content
- category
- created_at / updated_at

## 기술 스택

- React 18+
- Vite
- React Router
- Supabase JS
- CSS

## Routes

- `/`
- `/items`
- `/items/new`
- `/items/:id`
- `/items/:id/edit`
- `/about`
- `*` Not Found

## 로컬 실행 — Phase C

```bash
cd training/round-01-clear/reference
npm install
cp .env.example .env
# .env에 본인의 Supabase URL/anon key를 로컬에서만 입력
npm run dev
```

Vite가 표시하는 로컬 URL로 접속합니다.

## Supabase 준비

Supabase SQL Editor에서 `supabase-schema.sql`을 실행합니다.

Reference 정책은 B4-2 학습용 **anonymous CRUD**만을 위한 최소 정책입니다. 민감 데이터를 다루는 실서비스 보안 설계가 아닙니다.

## Environment

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

실제 `.env`는 Git에 저장하지 않습니다. Service Role Key를 frontend에 사용하지 않습니다.

## Component 설계

재사용 컴포넌트 8개 이상을 확보합니다.

- Button
- Input
- TextArea
- Card
- LoadingState
- ErrorState
- EmptyState
- Layout
- ItemCard
- ItemForm

페이지 컴포넌트는 `src/pages`, UI/도메인 재사용 컴포넌트는 `src/components`, 데이터 흐름은 `src/hooks`와 `src/lib`로 분리합니다.

## Custom hooks

- `useItems()` — 목록 로딩/에러/재조회
- `useItemDetail(id)` — 상세 로딩/에러/재조회

둘 다 `useEffect`로 원격 조회 시점을 연결합니다.

## 상태 → 렌더링 변화 예

1. 목록 검색 input 변경 → `query` state → filtered list 변경
2. Form input 변경 → `values` state → 미리보기 변경
3. Submit 시작 → `submitting` state → 버튼 비활성화/`저장 중…`
4. Remote request 시작/실패/빈 결과 → Loading/Error/Empty 공통 UI

## CRUD

모든 CRUD는 `src/lib/items.js`의 Supabase 원격 요청을 Source of Truth로 사용합니다. 로컬 배열을 영구 데이터처럼 사용하지 않습니다.

## 배포 — Phase C

Vercel/Netlify 등 외부 URL에 배포하고 실제 환경 변수 설정 후 다음을 다시 검증합니다.

- 목록
- 상세
- 등록
- 수정
- 삭제
- 새로고침/직접 URL 접근

배포 URL은 Runtime 전에는 기록하지 않습니다.
