# B4-2 Evaluation Q&A

## 왜 컴포넌트로 나눴나요?

페이지는 라우트 단위 흐름을 담당하고, 반복되는 UI/동작은 `components`로 분리했습니다. `Button`, `Input`, `LoadingState`, `ItemForm`처럼 prop에 따라 표시/행동이 달라지는 부분을 재사용 컴포넌트로 만들었습니다.

## props와 state 차이는?

props는 부모가 자식에게 전달하는 입력이고, state는 컴포넌트 내부에서 사용자 이벤트나 비동기 결과에 따라 변하는 값입니다. `ItemForm`의 `submitting`은 부모 page가 prop으로 주고, `values/errors`는 Form 내부 state입니다.

## state는 어디에 뒀나요?

가장 가까운 소유 컴포넌트에 둡니다. 검색어는 `ItemsPage`, Form 입력은 `ItemForm`, 원격 list/detail 결과는 custom hook, 등록/수정 요청 진행 상태는 각 page에 둡니다.

## useEffect는 언제 실행되나요?

`useItems`는 mount 시 `reload`를 실행하고, `useItemDetail`은 route `id`에 의존하는 callback이 바뀌면 상세를 다시 요청합니다. 데이터 요청 lifecycle을 page JSX에서 분리하기 위해 hook에 둡니다.

## 왜 custom hook으로 분리했나요?

원격 조회에는 data/loading/error/retry가 함께 반복됩니다. 이를 hook으로 묶으면 page는 어떤 UI를 렌더링할지에 집중하고 조회 상태 기계는 재사용할 수 있습니다.

## loading/error/empty는 어떻게 통일했나요?

`LoadingState`, `ErrorState`, `EmptyState` 공통 컴포넌트를 사용합니다. 페이지별로 서로 다른 문구는 prop으로 주지만 패턴 자체는 공통입니다.

## 상태 변경 → 화면 변경 지점 3개는?

1. 검색 input → `query` state → filtered list
2. Form input → `values` state → 미리보기
3. submit 시작 → `submitting` state → 버튼 disabled/`저장 중…`
4. 원격 요청 → loading/error/data state → 공통 상태 UI

## Supabase를 선택한 이유는?

공식 요구에서 Supabase/Firebase 중 하나가 필요합니다. SQL 테이블 기반 CRUD가 명확하고 JS client가 간단해 React의 비동기 데이터 흐름 학습에 집중하기 위해 Supabase를 선택했습니다.

## 전체 기능 흐름을 설명하면?

React Router가 page를 결정하고 → page/hook이 Supabase 데이터를 요청하고 → loading/error/data state가 바뀌며 → 공통 컴포넌트가 렌더링되고 → 사용자 입력/클릭이 state 및 remote CRUD를 변경한 뒤 → navigate 또는 reload로 다음 화면을 보여줍니다.

## 원격 데이터가 실패하면?

hook이나 submit handler가 error state를 설정하고 ErrorState 또는 form error를 렌더링합니다. 제출 중 상태는 finally/실패 경로에서 해제합니다.

## 왜 로컬 배열을 Source of Truth로 쓰지 않나요?

공식 Mission은 Supabase/Firebase의 원격 데이터를 기준으로 CRUD가 동작해야 하기 때문입니다. Reference의 CRUD 함수는 모두 Supabase client를 호출합니다.
