# codyssey-basic-b4-2-interactive-web-app

> 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

React 18 SPA에서 **라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링 → 원격 CRUD** 흐름을 구현한 `Learning Notes` 서비스입니다.

## 완료 상태

- G1 SOURCE: PASS
- G2 BUILD: PASS
- G3 TEST: PASS
- G4 REVIEW: PASS — BLOCKER 0 / MAJOR 0
- G5 RUNTIME: PASS
- G6 EVIDENCE: PASS
- G7 LEARN: PASS
- G8 MERGE: PR #1 merge 단계

공개 배포 URL:

- https://metastudy999.github.io/codyssey-basic-b4-2-interactive-web-app/

최종 런타임 검증 기준:

- GitHub Actions run `31261542821`
- 구조 검증 PASS
- Vitest 4 files / 13 tests PASS
- Vite production build PASS
- GitHub Pages 최신 `runtime-dist` 배포 확인 PASS
- Headless Chrome 실제 공개 URL E2E PASS
  - `/` 홈
  - `/notes` 직접 접근 + 새로고침
  - 필수값 validation
  - Create → Read → Update → Delete
  - 생성 데이터 새로고침 후 유지
  - 검색 결과 empty state
  - 잘못된 주소의 `404 - Not Found`

## 기술 스택

- React 18.3.1
- React Router 6.30.1
- Vite 6.1.0
- Supabase REST (PostgREST)
- GitHub Pages
- Vitest + React Testing Library
- Selenium / Headless Chrome 배포 E2E
- Plain CSS

## Routes

| Route | 화면 |
|---|---|
| `/` | 홈 |
| `/notes` | 목록 + 검색 |
| `/notes/new` | 등록 |
| `/notes/:id` | 상세 + 삭제 |
| `/notes/:id/edit` | 수정 |
| `/about` | React 흐름 학습 |
| `*` | Not Found |

## 재사용 컴포넌트

Mission의 prop 기반 재사용 기준을 만족하는 컴포넌트는 13개입니다.

`Button`, `TextField`, `TextAreaField`, `SelectField`, `LoadingState`, `ErrorState`, `EmptyState`, `PageHeader`, `StatusBanner`, `NoteCard`, `NoteList`, `NoteForm`, `ConfirmDialog`.

`AppLayout`은 공통 레이아웃이지만 prop 기반 평가 수에는 포함하지 않습니다.

## 폴더 구조

```text
src/
├── components/   # 재사용 UI와 공통 레이아웃
├── hooks/        # 조회/비동기 상태 custom hooks
├── lib/          # Supabase REST 설정
├── pages/        # route 단위 page
├── services/     # notes CRUD
└── test/         # 테스트 setup
```

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

로컬에서는 `.env.local`에 다음 두 값을 설정합니다.

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

`.env` 계열 실제 값은 Git에 커밋하지 않습니다. 공개 배포는 Supabase의 브라우저용 publishable/anon 권한을 런타임 설정으로 공급합니다. 서버 전용 secret/service-role key는 사용하지 않습니다.

## 검증

```bash
npm run verify
npm test
npm run build
```

`mission/b4-2` push CI는 위 검증 후 `runtime-dist`를 갱신하고 GitHub Pages가 해당 commit을 배포했는지 확인한 다음 공개 URL에서 실제 CRUD E2E를 수행합니다.

## 문서

- `MISSION-WORK-PACKET.md` — 요구사항·Gate·Evidence 추적
- `docs/LEARNING.md` — 평가 설명용 React 학습 정리
- `docs/SELF-REVIEW.md` — 자체 검토
- `docs/AGENT-REVIEW.md` — 독립 Copilot 검토 및 disposition
- `docs/RUNTIME-CHECKLIST.md` — 실제 런타임 검증 기록
- `HANDOFF.md` — 대표 저장소 통합용 Handoff
- `mission-result.yaml` — 기계 판독 가능한 완료 결과
