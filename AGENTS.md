# AGENTS.md — B4-2 Independent Review Contract

## Source of Truth

1. `b4-2-mission.pdf`
2. `b4-2-mission.md`
3. `b4-2-evaluation.md`
4. `MISSION-WORK-PACKET.md`

## Scope

B4-2 React SPA의 필수 요구 충족 여부만 검토한다.

검사 대상:
- route >= 5, Not Found, navigation
- remote Supabase CRUD
- loading/error/empty 공통 UI
- form validation/error/submitting
- `pages/components/hooks(or lib)` 구조
- custom hook 실제 사용
- prop 기반 reusable component >= 8
- React state/useEffect/async 흐름
- test/build 실패
- secret 노출 또는 `.env` commit 위험
- 문서가 실제 코드/검증 상태보다 과장되었는지

## Do Not

- 전체 프로젝트 재설계
- 인증/RLS/복잡한 백엔드 추가
- MINOR/스타일 취향을 이유로 대규모 리팩터링
- 실제 Supabase/배포 runtime을 실행하지 않고 PASS 판정
- Control Tower 또는 다른 Mission Repository 수정

## Test Commands

```bash
npm install
npm test
npm run build
```

## Finding Severity

- BLOCKER: 필수 요구를 수행할 수 없거나 데이터/secret/빌드에 치명적 문제
- MAJOR: 평가 항목의 명백한 누락/오동작
- MINOR: 통과를 막지 않는 품질 문제

## Output Contract

1. Verdict
2. BLOCKER findings
3. MAJOR findings
4. NEEDS-RUNTIME
5. Tests observed
6. Stop recommendation

## Stop Condition

BLOCKER=0, MAJOR=0이면 독립 검토를 종료한다. Runtime 미검증 항목은 `NEEDS-RUNTIME`으로 남긴다.
