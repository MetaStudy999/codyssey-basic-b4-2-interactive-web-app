# B4-2 Mission Work Packet

## 1. Identity

- Mission: B4-2 — 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기
- Target Repository: `MetaStudy999/codyssey-basic-b4-2-interactive-web-app`
- Work Branch: `mission/b4-2`
- Control Tower: `MetaStudy999/codyssey-basic` (READ ONLY)
- Frozen Baseline: `0d1581b3e82366988f57e1d76da311c028b8e15e`
- Active Wave: `20260808-01`

## 2. Source Inventory

| Source | State | Role |
|---|---|---|
| `b4-2-mission.pdf` (6 pages) | VALID | 최고 우선 Mission Source |
| `b4-2-mission.md` | DUPLICATE | PDF의 Markdown 정리본 |
| `b4-2-evaluation.md` | VALID | 공식 평가문항 |

- Source Mode: `FULL SOURCE`
- Source Confidence: `HIGH`
- Remaining Source Gap: 없음. 별도 Evaluation PDF는 없지만 유효한 Evaluation Markdown으로 평가 요구를 확정함.

## 3. Mission Contract

필수 계약:

1. React 18+ SPA
2. 주요 라우트 5개 이상 + Not Found + navigation
3. Supabase/Firebase 원격 CRUD
4. 목록/상세/등록/수정/삭제
5. `pages`, `components`, `hooks` 또는 `lib` 책임 분리
6. prop 기반 재사용 컴포넌트 8개 이상
7. controlled form + required validation + error + submitting state
8. 공통 loading/error/empty UI
9. 데이터 흐름 custom hook 최소 1개
10. state → render 변화 3곳 이상
11. 공개 배포 URL에서 CRUD 동작
12. README 실행법/기술 스택 + 환경변수/키 관리

Non-scope: 인증 고도화, 복잡한 관계, 별도 백엔드 서버, Mission 완료를 지연시키는 선택적 리팩터링.

## 4. Requirement Traceability / Evaluation Mapping

| Requirement | Final Evidence |
|---|---|
| React 18+ | `package.json` React 18.3.1 |
| 5+ routes + Not Found | `src/App.jsx`; 7 path routes; structure test PASS; deployed Not Found E2E PASS |
| remote CRUD | `src/services/notes.js`; Supabase `notes`; real DB + deployed browser C/R/U/D PASS |
| persistence | 생성 후 hard refresh에서 동일 데이터 확인 PASS |
| loading/error/empty | shared state components 존재; unit/hook tests PASS; deployed empty-search state PASS |
| validation/submitting | `NoteForm`; tests PASS; deployed required validation PASS |
| custom hooks | `useNotes`, `useNote`; tests PASS |
| folder separation | `src/pages`, `src/components`, `src/hooks`, `src/lib`, `src/services` |
| reusable components >=8 | prop-based 13개; static verification PASS |
| state-render >=3 | search/filter, form preview/input, dialog/submitting/loading/error 흐름; `docs/LEARNING.md` |
| public deployment | GitHub Pages public URL; direct `/notes` refresh PASS |
| secret handling | `.env*` ignored; actual secret/service-role key 미사용·미커밋 |

## 5. Repository Baseline

G1 시점 `main` SHA: `d1a72a8ecdf0857dd1e96ecc746816927be4b943`

당시 React project, `package.json`, routes, data source, tests, deployment가 없었고 Mission/Evaluation 문서만 존재했다.

## 6. Dependency / Drift

- B4-1 공식 선행조건: `NONE`
- 운영상 관계: `RECOMMENDED`
- B4-1 산출물 없이 독립 구현 가능
- Control Tower Drift: 완료 판정에 영향을 주는 drift 없음; Frozen Baseline 유지

## 7. Implemented Build

Domain: `Learning Notes`

Routes:
1. `/`
2. `/notes`
3. `/notes/new`
4. `/notes/:id`
5. `/notes/:id/edit`
6. `/about`
7. `*` Not Found

Remote backend:
- Supabase project: `codyssey-b4-2-learning-notes`
- project ref: `metyfpxbqoxfuhkuupyd`
- region: `ap-northeast-2`
- table: `public.notes`
- browser-facing CRUD via PostgREST

Deployment:
- `https://metastudy999.github.io/codyssey-basic-b4-2-interactive-web-app/`
- Pages source: `runtime-dist` / root
- `404.html` SPA direct-route fallback
- Supabase Edge Function `b4-2-app` supplies browser-safe runtime configuration

## 8. Component / Hook Inventory

Prop-based reusable components 13개:

`Button`, `TextField`, `TextAreaField`, `SelectField`, `LoadingState`, `ErrorState`, `EmptyState`, `PageHeader`, `StatusBanner`, `NoteCard`, `NoteList`, `NoteForm`, `ConfirmDialog`.

Custom hooks: `useNotes`, `useNote`.

## 9. Test / Runtime Result

Verified implementation head: `c2894d05dba2dd0f9e52234c3ebe2581a25dbb94`

GitHub Actions push run `31261542821`: SUCCESS.

PASS stages:
- dependency install
- structure verification
- Vitest: 4 files / 13 tests
- production build
- deployable bundle preparation
- `runtime-dist` publication
- GitHub Pages expected-commit build wait
- Selenium/Headless Chrome public deployment E2E

Live E2E final output:

`LIVE_E2E_PASS: root, direct-route refresh, validation, create, read, update, empty-search, delete, not-found`

Runtime-generated E2E rows are deleted; cleanup verification found 0 matching rows after the earlier failed attempt, and the successful flow deletes its row through the UI.

## 10. Review Result

- Self review: completed
- Independent reviewer: GitHub Copilot code review
- Initial result: BLOCKER 0 / MAJOR 1 / MINOR 3
- MAJOR disposition: ACCEPT and fixed in `71c7430b5339230026410f1f71ca1d84582470bf`
- Regression test + CI revalidation: PASS
- Effective result: BLOCKER 0 / MAJOR 0
- Accessibility MINOR 3: optional PRO backlog under STOP rule

## 11. Gate Checklist

- G1 SOURCE: PASS
- G2 BUILD: PASS
- G3 TEST: PASS
- G4 REVIEW: PASS — BLOCKER 0 / MAJOR 0
- G5 RUNTIME: PASS — public deployed browser + real Supabase CRUD
- G6 EVIDENCE: PASS — source/code/test/review/runtime/deployment evidence recorded
- G7 LEARN: PASS — `docs/LEARNING.md`
- G8 MERGE: READY — final docs CI 후 PR #1 merge

## 12. STOP Rule

필수 Mission/Evaluation 요구, 자동 테스트, 실제 public runtime, Evidence, BLOCKER 0 / MAJOR 0를 충족했다. 추가 접근성 MINOR 및 고도화는 완료를 지연시키지 않는 backlog로 유지한다.

## 13. Handoff Contract

`HANDOFF.md`와 `mission-result.yaml`을 대표 Repository Serial Integration의 입력으로 사용한다. Control Tower는 이 Workcell에서 수정하지 않는다.
