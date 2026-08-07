# codyssey-basic-b4-2-interactive-web-app

> 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

React SPA에서 **라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링** 흐름을 직접 확인하는 `Learning Notes` CRUD 서비스입니다. 원격 데이터는 Supabase를 사용합니다.

## 현재 상태

- G1 SOURCE: PASS
- G2 BUILD: IMPLEMENTED
- G3 TEST: GitHub Actions에서 테스트/빌드 검증
- G5/G6: 실제 Supabase + 배포 URL 검증 전에는 PASS로 표시하지 않습니다.

## 기술 스택

- React 18.3.1
- React Router 6
- Vite
- Supabase REST (PostgREST)
- Vitest + React Testing Library
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

Mission의 “최소 1개 이상의 prop을 받아 동작이나 표시가 달라지는 컴포넌트” 기준으로 **13개**를 명시적으로 관리합니다.

1. `Button`
2. `TextField`
3. `TextAreaField`
4. `SelectField`
5. `LoadingState`
6. `ErrorState`
7. `EmptyState`
8. `PageHeader`
9. `StatusBanner`
10. `NoteCard`
11. `NoteList`
12. `NoteForm`
13. `ConfirmDialog`

`AppLayout`은 여러 페이지가 공유하는 공통 레이아웃이지만 prop을 받지 않으므로 위 13개 평가용 재사용 컴포넌트 수에는 포함하지 않습니다.

## 폴더 구조

```text
src/
├── components/   # prop 기반 재사용 UI + 공통 레이아웃
├── hooks/        # useEffect + 비동기 상태 캡슐화
├── lib/          # Supabase client 설정
├── pages/        # 라우트 단위 화면
├── services/     # 원격 CRUD 접근
└── test/         # test setup
```

페이지는 화면 조합과 navigation을 담당하고, 공통 UI는 `components`, 원격 조회 생명주기는 `hooks`, Supabase 호출은 `services/lib`에 둡니다.

## 1. 설치

```bash
npm install
cp .env.example .env.local
```

`.env.local`:

```text
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

`.env*` 실제 값은 Git에 commit하지 않습니다.

## 2. Supabase 준비

Supabase SQL Editor에서 [`docs/supabase-schema.sql`](./docs/supabase-schema.sql)을 실행합니다.

이 스키마는 B4-2 학습용으로 익명 CRUD를 허용하기 위해 RLS를 비활성화합니다. Mission은 고급 권한/RLS를 요구하지 않지만 **운영 서비스에서는 그대로 사용하면 안 됩니다.**

## 3. 로컬 실행

```bash
npm run dev
```

Vite가 출력한 URL(기본 `http://localhost:5173`)을 브라우저에서 엽니다.

## 4. 자동 검증

```bash
npm test
npm run build
# 또는
npm run check
```

자동 테스트는 route/Not Found, form validation, controlled state → preview, submitting state, custom hook loading/success/error를 검증합니다.

실제 원격 CRUD와 배포 URL은 자동 테스트로 대체하지 않습니다. [`docs/RUNTIME-CHECKLIST.md`](./docs/RUNTIME-CHECKLIST.md)에 실제 결과를 남깁니다.

## 5. CRUD 흐름

- Create: `/notes/new` → `createNote` → 상세로 navigate
- Read: `/notes` / `/notes/:id` → `useNotes` / `useNote`
- Update: `/notes/:id/edit` → `updateNote` → 상세로 navigate
- Delete: 상세 → confirm state → `deleteNote` → 목록으로 navigate

## 6. loading / error / empty

페이지마다 같은 마크업을 복사하지 않고 공통 `LoadingState`, `ErrorState`, `EmptyState`를 사용합니다.

## 7. 상태 → 렌더 변화 예

- 검색 input → `query` state → 필터된 카드 목록
- 폼 title input → `values.title` state → 실시간 미리보기
- 삭제 버튼 → `confirmOpen` state → dialog 표시
- 제출 시작 → `submitting` state → disabled 버튼 + 진행 문구

상세 설명: [`docs/LEARNING.md`](./docs/LEARNING.md)

## 8. 배포

Vercel 또는 Netlify에서 이 GitHub 저장소를 연결한 후 Environment Variables에 아래 두 값을 등록합니다.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

`vercel.json`과 `public/_redirects`가 SPA 직접 URL 접근을 위한 fallback을 제공합니다.

배포 완료 후 **배포 URL에서** 목록/상세/등록/수정/삭제를 다시 검증해야 Mission runtime이 완료됩니다.

## 공식 자료

- [B4-2 미션](./b4-2-mission.md)
- [B4-2 평가문항](./b4-2-evaluation.md)
- [확정 Work Packet](./MISSION-WORK-PACKET.md)
