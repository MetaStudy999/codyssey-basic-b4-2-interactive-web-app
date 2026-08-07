# B4-2 Runtime / Evidence Checklist

실제 실행한 결과만 체크한다. 예상 결과는 PASS 증거로 사용하지 않는다.

## Supabase

- [ ] `docs/supabase-schema.sql` 실행
- [ ] `.env.local`에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 설정
- [ ] 키 값은 GitHub/스크린샷에 노출하지 않음

## 로컬 브라우저

- [ ] `/`, `/notes`, `/notes/new`, `/notes/:id`, `/notes/:id/edit`, `/about` 동작
- [ ] 잘못된 주소에서 404 Not Found
- [ ] 목록 loading → success/empty 확인
- [ ] 의도적 설정 오류로 error UI 확인 후 복구
- [ ] 제목/내용 미입력 시 validation 메시지
- [ ] submit 중 버튼 disabled/진행 문구
- [ ] Create → Read → Update → Delete 전체 수행
- [ ] 새로고침 후 Supabase 데이터가 유지됨

## 배포

- [ ] Vercel 또는 Netlify에 배포
- [ ] 배포 플랫폼에 두 환경변수 등록
- [ ] 직접 URL(`/notes`, `/notes/<id>`) 새로고침 성공
- [ ] 배포 URL에서 Create → Read → Update → Delete 전체 수행

## Evidence 권장 위치

`evidence/`에 secret이 보이지 않도록 캡처/로그를 저장한다.

- route-home.png
- route-not-found.png
- state-loading.png
- state-empty.png
- state-error.png
- form-validation.png
- form-submitting.png
- crud-before-after.png
- deployed-crud.png
- test-build.txt
