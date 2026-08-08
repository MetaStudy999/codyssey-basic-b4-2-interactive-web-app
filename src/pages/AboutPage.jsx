import { PageHeader } from '../components/PageHeader'

export function AboutPage() {
  return (
    <section>
      <PageHeader title="학습 포인트" description="평가에서 설명해야 하는 React 데이터 흐름을 구현 위치와 연결합니다." />
      <ol className="learning-list">
        <li><strong>Routing</strong>: URL을 페이지 컴포넌트에 연결합니다.</li>
        <li><strong>Component</strong>: 페이지는 조합을 담당하고 공통 UI는 재사용 컴포넌트로 분리합니다.</li>
        <li><strong>State</strong>: 폼·비동기·필터 상태를 가장 가까운 소유 컴포넌트/훅에 둡니다.</li>
        <li><strong>Event</strong>: 입력·클릭·제출 이벤트가 setState 또는 원격 요청을 발생시킵니다.</li>
        <li><strong>Render</strong>: 상태가 바뀌면 React가 필요한 UI를 다시 렌더링합니다.</li>
      </ol>
    </section>
  )
}
