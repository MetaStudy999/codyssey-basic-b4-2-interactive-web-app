# B4-2 Runtime / Evidence Checklist

실제 실행·확인된 결과만 기록한다.

## Supabase

- [x] `docs/supabase-schema.sql` 적용
- [x] `public.notes` 원격 테이블 생성
- [x] 브라우저용 anonymous/publishable CRUD 권한 적용
- [x] 실제 DB Create → Read → Update → Delete smoke PASS
- [x] 테스트 데이터 cleanup 확인
- [x] 실제 secret/service-role key는 GitHub에 커밋하지 않음

Supabase:
- project: `codyssey-b4-2-learning-notes`
- ref: `metyfpxbqoxfuhkuupyd`
- region: `ap-northeast-2`

## Automated / Component

GitHub Actions run `31261542821`: PASS

- [x] structure verification
- [x] 7 route declarations + wildcard Not Found
- [x] prop-based reusable components 13개
- [x] custom hooks 존재
- [x] `.env` ignored
- [x] Vitest 4 files / 13 tests PASS
- [x] Vite production build PASS

## Public Deployment

- [x] GitHub Pages 활성화
- [x] source branch `runtime-dist`, folder `/ (root)`
- [x] HTTPS public URL 제공
- [x] expected `runtime-dist` commit의 Pages build 완료 확인

Public URL:

`https://metastudy999.github.io/codyssey-basic-b4-2-interactive-web-app/`

## Deployed Browser E2E

GitHub Actions의 Selenium + Headless Chrome으로 위 **실제 공개 URL**을 검증했다.

- [x] `/` — `Learning Notes` 렌더
- [x] `/notes` 직접 URL 접근
- [x] `/notes` hard refresh 후 SPA 복구
- [x] `/notes/new` 접근
- [x] 제목/내용 미입력 validation 메시지
- [x] Create
- [x] 생성 후 상세 Read
- [x] hard refresh 후 원격 데이터 persistence
- [x] Update
- [x] 목록에서 수정 데이터 확인
- [x] 검색 조건 무결과 EmptyState 확인
- [x] Delete + 목록에서 삭제 확인
- [x] 임의의 잘못된 URL에서 `404 - Not Found`

최종 로그:

`LIVE_E2E_PASS: root, direct-route refresh, validation, create, read, update, empty-search, delete, not-found`

## UI State Evidence Scope

- Loading: `LoadingState` 구현 + hook/component 자동 테스트로 검증
- Error: `ErrorState` 구현 + 오류 흐름 자동 테스트로 검증
- Empty: 실제 공개 browser E2E의 검색 무결과 상태로 검증
- Validation: 실제 공개 browser E2E로 검증
- Submitting: `NoteForm` submitting 상태 구현/자동 테스트로 검증

Mission은 동작 및 설명 가능성을 요구하며 스크린샷 파일 자체를 필수 형식으로 규정하지 않으므로, 재현 가능한 CI/E2E 로그를 primary Evidence로 사용한다.

## Final Result

- G5 RUNTIME: PASS
- G6 EVIDENCE: PASS
- Required runtime gap: NONE
