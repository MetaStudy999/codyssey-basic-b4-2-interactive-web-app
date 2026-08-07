# B4-2 Self Review

검토 범위는 Mission/Evaluation의 필수 요구와 BLOCKER/MAJOR에 한정한다. 실제 브라우저·Supabase·배포 검증을 자동 테스트로 대체하지 않는다.

## Verdict

- BLOCKER: 0
- MAJOR: 0
- MINOR 수정: 재사용 컴포넌트 수를 파일 개수가 아니라 Mission의 `prop` 정의로 다시 산정하여 13개로 교정함.
- NEEDS-RUNTIME: 실제 Supabase 원격 persistence, 배포 URL CRUD, 브라우저 상태 UI 캡처.
- Independent reviewer: 아직 별도 실행되지 않음.

## Evaluation mapping

### 기능 구현 및 배포

- 5+ routes: 7 path routes 구현. structure verifier 및 route test 통과.
- Not Found: wildcard route + component test 통과.
- CRUD: Supabase REST list/detail/create/update/delete 구현, service tests 통과.
- loading/error/empty: 공통 components로 분리, hook test로 loading/error 확인. 실제 화면 증거 필요.
- form UX: required validation, error text, submitting disabled state test 통과.
- deployed URL: 미검증. PASS 금지.

### 구조 및 재사용

- `pages/components/hooks/lib/services` 책임 분리 확인.
- `useNotes`, `useNote`가 실제 페이지에서 사용됨.
- Mission의 prop 기준으로 재사용 컴포넌트 13개.
- Loading/Error/Empty는 페이지별 복사 대신 공통 컴포넌트 사용.

### React 상태 / 비동기

- props/state 설명은 `docs/LEARNING.md`와 구현이 일치.
- `useEffect`는 custom hook에서 원격 조회 생명주기에 사용.
- 상태 → 렌더 변화: 검색 query, 폼 preview, confirm dialog, submitting, async states 등 3개 이상 존재.

### 전체 흐름 / backend

- Routing → page → component/hook state → event → render 흐름 문서화.
- Supabase 선택 이유와 배포 환경변수 주의점을 문서화.

## Secret review

- 실제 `.env` 파일은 commit하지 않음.
- `.env.example` 값은 비어 있음.
- `.gitignore`에 `.env` 포함.
- 소스에 실제 Supabase URL/key를 하드코딩하지 않음.

## Review conclusion

코드/자동 테스트 관점의 필수 요구에서 BLOCKER/MAJOR는 발견하지 못했다. 다만 원격 데이터와 배포가 공식 필수이므로 G5/G6가 끝나기 전 Mission PASS 또는 PR merge를 하지 않는다.
