# B4-2 학습 가이드

## 1. 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링

예: 새 노트 등록

1. `/notes/new` 라우트가 `NewNotePage`를 선택한다.
2. 페이지가 재사용 `NoteForm`을 렌더링한다.
3. `NoteForm`의 `values` state가 controlled input 값을 소유한다.
4. `onChange` 이벤트가 `setValues`를 호출해 state를 바꾼다.
5. React가 입력값과 미리보기를 다시 렌더링한다.
6. submit 이벤트가 `createNote`를 호출한다.
7. 성공하면 `navigate('/notes/:id')`로 상세 화면으로 이동한다.

## 2. props와 state

- props: 부모가 자식에게 전달하는 읽기 입력값이다. `Button.variant`, `LoadingState.label`, `NoteCard.note`가 예다.
- state: 컴포넌트/훅 내부에서 시간에 따라 바뀌는 값이다. `NoteForm.values`, `useNotes.loading`, `useNotes.error`가 예다.
- 상태는 가능한 한 그 값을 사용하는 가장 가까운 소유자에 둔다. 목록 비동기 상태는 `useNotes`, 단일 상세 상태는 `useNote`, 폼 상태는 `NoteForm`이 소유한다.

## 3. useEffect와 의존성 배열

`useNotes`는 `useEffect(() => reload(), [reload])`를 사용한다. `reload`는 `useCallback(..., [])`로 안정적인 함수 참조를 가지므로 초기 mount에서 조회하고, 참조가 달라질 때만 다시 실행된다.

`useNote`는 `reload`가 `id`에 의존한다. URL의 `id`가 바뀌면 `reload`가 새로 만들어지고 effect가 다시 실행되어 새 상세 데이터를 조회한다.

## 4. 비동기 UI 4상태

- loading: `LoadingState`
- success: `NoteList` 또는 상세 내용
- empty: `EmptyState`
- error: `ErrorState`

같은 패턴을 페이지마다 직접 복사하지 않고 공통 컴포넌트로 통일한다.

## 5. 상태 변경 → 화면 변화 3곳 이상

1. 목록 검색어 `query` 변경 → `filteredNotes` 변경 → 카드 목록 변경
2. 폼 `title` 변경 → `preview` 변경 → 미리보기 문구 변경
3. 상세 `confirmOpen` 변경 → 삭제 확인 다이얼로그 표시/숨김
4. `submitting` 변경 → 저장 버튼 disabled + “저장 중...” 문구
5. `loading/error` 변경 → Loading/Error/List UI 전환

## 6. 커스텀 훅으로 분리한 이유

`useNotes`와 `useNote`는 페이지가 데이터 조회의 세부 절차보다 화면 조합에 집중하도록 비동기 상태와 `useEffect`를 캡슐화한다. 재시도(`reload`)도 동일한 흐름을 재사용할 수 있다.

## 7. Supabase 선택 이유

- 단일 테이블 CRUD를 빠르게 원격 저장소로 연결할 수 있다.
- SQL 기반 데이터 확인이 쉬워 학습자가 “원격 데이터가 실제로 남는지” 검증하기 좋다.
- B4-2의 핵심은 백엔드 고급 기능이 아니라 React 데이터 흐름이므로 최소 범위로 사용한다.

어려움/주의점은 로컬 환경변수와 배포 플랫폼 환경변수를 각각 설정해야 한다는 점, 그리고 SPA 직접 URL 접근 시 rewrite가 필요하다는 점이다.
