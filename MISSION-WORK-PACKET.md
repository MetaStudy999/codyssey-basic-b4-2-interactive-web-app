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
| `b4-2-mission.md` | DUPLICATE | PDF 내용을 Markdown 구조로 정리 |
| `b4-2-evaluation.md` | VALID | 공식 평가문항 |

Source Mode: `FULL SOURCE`
Source Confidence: `HIGH`
Source Gap: Evaluation PDF는 발견되지 않았지만 유효한 Evaluation Markdown이 있어 요구사항 확정에는 Gap이 없음.

## 3. Mission Contract

### 필수

- React 18+ SPA
- 주요 라우트 5개 이상 + Not Found
- 단일 핵심 데이터의 원격 CRUD(Supabase 또는 Firebase)
- 목록/상세/등록/수정/삭제
- `pages`, `components`, `hooks` 또는 `lib` 역할 분리
- prop에 따라 표시/동작이 달라지는 재사용 컴포넌트 8개 이상
- controlled form, required validation, error message, submitting state
- 공통 loading/error/empty UI
- 조회/갱신 흐름 최소 1개 custom hook
- 상태 변경 → 렌더 변화 3곳 이상
- 배포 URL에서 CRUD 전체 동작
- `.env` / 배포 Environment Variables로 key 관리

### Non-scope

- 인증/RLS 고도화, 복잡한 관계, 별도 백엔드 서버
- 보너스 성능 최적화/전역 상태는 완료를 지연시키지 않음

## 4. Requirement Traceability / Evaluation Mapping

| Requirement | Evidence / State |
|---|---|
| 5+ routes + Not Found | `src/App.jsx`; verifier/test PASS; deploy bundle has SPA `404.html`; final public-browser verification pending |
| CRUD | `src/services/notes.js`; tests PASS; real Supabase DB create/read/update/delete smoke PASS |
| loading/error/empty | shared components + tests PASS; final public-browser observation pending |
| form validation/submitting | `NoteForm` tests PASS; final public-browser observation pending |
| custom hook | `useNotes`, `useNote`; hook tests PASS |
| folders | `src/pages`, `src/components`, `src/hooks`, `src/lib` IMPLEMENTED |
| 8+ reusable components | 13 prop-based components; static verification PASS |
| 3+ state-render changes | `docs/LEARNING.md` + tests document/cover examples |
| deployed CRUD | backend/runtime infrastructure prepared; final public SPA host verification blocked by host-control permission |

## 5. Repository Baseline

G1 조사 시점 `main` SHA: `d1a72a8ecdf0857dd1e96ecc746816927be4b943`

- React project: 없음
- `package.json`: 없음
- routes: 0
- data source: 없음
- tests: 없음
- deployment config/URL: 없음
- 문서만 존재: README + Mission PDF/MD + Evaluation MD

## 6. Dependency / Drift

- B4-1 공식 선행조건: `NONE`
- 운영상 관계: `RECOMMENDED`
- 독립 구현 가능하므로 B4-1 완료를 기다리지 않는다.
- Control Tower는 수정하지 않는다.

## 7. Implemented Build

도메인: `Learning Notes`

Routes:
1. `/`
2. `/notes`
3. `/notes/new`
4. `/notes/:id`
5. `/notes/:id/edit`
6. `/about`
7. `*` Not Found

Remote backend adapter: Supabase `notes` 단일 테이블 / PostgREST.

## 8. Component / Hook Inventory

Evaluation 정의를 만족하는 prop 기반 reusable components 13개:

`Button`, `TextField`, `TextAreaField`, `SelectField`, `LoadingState`, `ErrorState`, `EmptyState`, `PageHeader`, `StatusBanner`, `NoteCard`, `NoteList`, `NoteForm`, `ConfirmDialog`.

`AppLayout`은 공통 레이아웃이지만 prop을 받지 않으므로 위 평가 수에는 포함하지 않는다.

Custom hooks: `useNotes`, `useNote`.

## 9. Test / Runtime Result

### Automated verification

Latest clean mission CI: run `31259552143` on commit `61bbce4e06639f244af4aada2efdb04e391822ed`: SUCCESS.

Passed stages:
- dependency install
- structure verification
- 13 unit/component tests
- production build
- runtime bundle preparation
- production artifact upload
- `runtime-dist` branch publication

### Independent review

- Reviewer: GitHub Copilot
- Initial: BLOCKER 0 / MAJOR 1
- MAJOR: `createNote()` empty representation could produce an undefined id
- Disposition: ACCEPT; fixed in `71c7430b5339230026410f1f71ca1d84582470bf` with regression test
- Revalidation CI: SUCCESS
- Effective result: BLOCKER 0 / MAJOR 0
- Accessibility MINOR findings retained as PRO backlog under STOP rule

### Real Supabase runtime

- Project: `codyssey-b4-2-learning-notes`
- Project ref: `metyfpxbqoxfuhkuupyd`
- Region: `ap-northeast-2`
- Schema/educational anonymous CRUD permissions applied
- Real DB create → read → update → delete smoke verification PASS; test data cleaned up
- Edge Function `b4-2-app` deployed as public runtime-config endpoint
- Server-side HTTP smoke verified health/root/direct-route/static-asset availability during deployment work

### Public host blocker

A deployable SPA artifact is published to `runtime-dist`. Automatic GitHub Pages activation was attempted but GitHub returned `403 Resource not accessible by integration`; the repository Actions token cannot create/enable the Pages site. Vercel connector deployment responses could not be independently retrieved afterward and therefore are not accepted as evidence.

Accordingly, final browser-host CRUD/direct-refresh evidence is deliberately not marked PASS.

## 10. Gate Checklist

- G1 SOURCE: PASS
- G2 BUILD: PASS
- G3 TEST: PASS
- G4 REVIEW: PASS — effective BLOCKER 0 / MAJOR 0
- G5 RUNTIME: PARTIAL — real Supabase CRUD PASS; final public SPA browser host verification pending
- G6 EVIDENCE: PARTIAL — source/test/review/backend/deploy-artifact evidence complete; public browser evidence pending
- G7 LEARN: PASS (`docs/LEARNING.md`)
- G8 MERGE: BLOCKED by G5/G6; PR remains Draft

## 11. STOP / Merge Rule

Do not merge until the public SPA host is enabled and the deployed URL is verified for direct-route refresh plus create/read/update/delete and required UI states. Do not downgrade this external permission gap into a false PASS.

## 12. Next External Action

Enable GitHub Pages for this repository using branch `runtime-dist` and folder `/ (root)` (or establish another independently verifiable static host). After the site is live, perform final browser runtime evidence, then write completion handoff/result and merge PR #1.
