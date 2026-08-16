# B4-2 Round 01 — Mission Clear Checklist

현재 모드: **Phase A — REFERENCE BUILD**  
Runtime Mission 상태: **⬜ NOT STARTED**

> Reference 구현이 있어도 실제 Supabase/브라우저/배포 Evidence 전에는 CLEAR가 아닙니다.

## A. Source
- [x] Mission PDF/MD 확인
- [x] Evaluation 확인
- [x] 필수/보너스/Runtime 분리

## B. Reference 구조
- [x] React 18 + Vite
- [x] `pages/`
- [x] `components/`
- [x] `hooks/`
- [x] `lib/`
- [x] 공통 Layout/Nav
- [x] `.env.example`
- [x] Supabase schema

## C. Routing
- [x] `/`
- [x] `/items`
- [x] `/items/new`
- [x] `/items/:id`
- [x] `/items/:id/edit`
- [x] `/about`
- [x] `*` Not Found
- [x] Navigation links

## D. Reusable Components
- [x] Button
- [x] Input
- [x] TextArea
- [x] Card
- [x] LoadingState
- [x] ErrorState
- [x] EmptyState
- [x] Layout
- [x] ItemCard
- [x] ItemForm
- [x] 공통 Loading/Error/Empty 패턴

## E. React State / Hook
- [x] controlled form
- [x] list data state
- [x] detail data state
- [x] loading/error state
- [x] `useItems()` custom hook
- [x] `useItemDetail(id)` custom hook
- [x] `useEffect` remote fetch
- [x] 검색 state → list render
- [x] form state → preview render
- [x] submitting state → button render

## F. Remote CRUD Reference
- [x] Supabase list select
- [x] Supabase detail select
- [x] Supabase insert
- [x] Supabase update
- [x] Supabase delete
- [x] local array를 persistent Source of Truth로 사용하지 않음

## G. Form UX Reference
- [x] 필수값 검증
- [x] field error 표시
- [x] submit error 표시
- [x] submitting 버튼 비활성화
- [x] `저장 중…` UI

## H. Environment / Secret
- [x] `VITE_SUPABASE_URL` env
- [x] `VITE_SUPABASE_ANON_KEY` env
- [x] `.env` gitignore 정책
- [x] Service Role Key frontend 금지 문서화
- [x] setup/verify/reset 준비
- [ ] 실제 `.env` Git 비포함 확인

## I. Documentation
- [x] `REFERENCE-BUILD.md`
- [x] `REFERENCE-STATUS.md`
- [x] `reference/README.md`
- [x] Requirements Mapping
- [x] Evaluation Q&A
- [x] Evidence Guide
- [x] Beginner Guide

## J. Runtime — Phase C
- [ ] Node/npm 실제 버전 확인
- [ ] `npm install`
- [ ] `npm run build`
- [ ] 실제 Supabase project
- [ ] schema/policy 실제 생성
- [ ] remote 목록/상세
- [ ] remote 등록
- [ ] remote 수정
- [ ] remote 삭제
- [ ] loading UI
- [ ] error UI
- [ ] empty UI
- [ ] validation UI
- [ ] submitting UI
- [ ] Not Found 직접 접근
- [ ] state→render 3개 이상 실제 설명

## K. Deployment
- [x] SPA rewrite Reference 준비
- [ ] 실제 Vercel/Netlify 배포
- [ ] 실제 environment variables 설정
- [ ] 실제 외부 URL
- [ ] 배포 URL 목록/상세
- [ ] 배포 URL 등록/수정/삭제
- [ ] 직접 route 새로고침 정상

## L. Evaluation / Evidence
- [x] 평가 Q&A 기준 답변 준비
- [x] Requirement→Implementation→Verification→Evidence 매핑
- [ ] 실제 Runtime Evidence
- [ ] 사용자 props/state 설명
- [ ] 사용자 useEffect 설명
- [ ] 사용자 loading/success/error/empty 설명
- [ ] 사용자 전체 route→component→state→event→render 설명
- [ ] Supabase 선택/연동 어려움 실제 경험 설명

## M. CLEAR
- [ ] Reference verify 실제 실행
- [ ] Runtime CRUD 통과
- [ ] 배포 CRUD 통과
- [ ] Secret 노출 없음
- [ ] BLOCKER 0 / MAJOR 0
- [ ] **✅ B4-2 CLEAR**
