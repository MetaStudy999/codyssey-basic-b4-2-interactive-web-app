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

- 인증, RLS 고도화, 복잡한 관계, 별도 백엔드 서버
- 보너스 성능 최적화/전역 상태는 완료를 지연시키지 않음

## 4. Requirement Traceability / Evaluation Mapping

| Requirement | Planned Evidence |
|---|---|
| 5+ routes + Not Found | `src/App.jsx`, route runtime capture |
| CRUD | `src/services/notes.js`, local/deployed CRUD capture |
| loading/error/empty | shared components + runtime capture |
| form validation/submitting | `NoteForm` tests + runtime capture |
| custom hook | `useNotes`, `useNote`, hook tests |
| folders | `src/pages`, `src/components`, `src/hooks`, `src/lib` |
| 8+ reusable components | component inventory in README |
| 3+ state-render changes | `docs/LEARNING.md` + tests/runtime |
| deployed CRUD | deployment URL + browser evidence |

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

- B4-1 공식 선행조건: `NONE` (B4-2 Mission/Evaluation에 선행 완료 요구 없음)
- 운영상 관계: `RECOMMENDED` (웹 기초 지식이 React 학습 기반)
- 독립 구현 가능하므로 B4-1 완료를 기다리지 않는다.
- Control Tower drift: 시작 시점 발견 없음. Frozen baseline을 계속 사용한다.

## 7. Build Plan

도메인: `Learning Notes`

Routes:
1. `/`
2. `/notes`
3. `/notes/new`
4. `/notes/:id`
5. `/notes/:id/edit`
6. `/about`
7. `*` Not Found

Remote backend: Supabase `notes` 단일 테이블.

## 8. Component / Hook Plan

Reusable components target >= 8: Button, TextField, TextAreaField, SelectField, LoadingState, ErrorState, EmptyState, PageHeader, StatusBanner, NoteCard, NoteList, NoteForm, ConfirmDialog, AppLayout.

Custom hooks: `useNotes`, `useNote`.

## 9. Test Plan

Automated:
- route home / Not Found
- form required validation
- controlled input → preview render
- submitting disabled state
- hook loading → success / error
- production build

Runtime:
- all routes + direct URL refresh
- real Supabase persistence CRUD
- loading/error/empty state
- deployed URL CRUD

## 10. Agent Routing / Review Budget

- Orchestrator/Builder: ChatGPT
- Automated harness: Vitest + Vite build
- Independent reviewer: 1회, G4에서 BLOCKER/MAJOR만 집중
- Review budget: self review 1회 + independent review 1회 + 필요한 항목만 재검증 1회

## 11. Gate Checklist

- G1 SOURCE: PASS
- G2 BUILD: TODO
- G3 TEST: TODO
- G4 REVIEW: TODO
- G5 RUNTIME: TODO
- G6 EVIDENCE: TODO
- G7 LEARN: TODO
- G8 MERGE: TODO

## 12. STOP Rule

Mission/Evaluation 필수 요구 충족 + BLOCKER 0 + MAJOR 0 + 자동 테스트 통과 + 실제 Supabase/deployed runtime Evidence 완료 시 종료하고 추가 고도화는 backlog로 이동한다.

## 13. Handoff Contract

완료 시 `HANDOFF.md`, `mission-result.yaml`에 Source Mode, route/component/hook/CRUD coverage, test/runtime/evidence, final PR/SHA, remaining risk를 기록한다. Control Tower는 수정하지 않는다.
