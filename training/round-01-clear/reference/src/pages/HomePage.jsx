import { Link } from 'react-router-dom';

import { Button, Card } from '../components/ui';

export function HomePage() {
  return (
    <section>
      <p className="eyebrow">B4-2 React SPA Reference</p>
      <h1>학습 카드를 원격 DB로 관리합니다.</h1>
      <p>React Router, 상태, 이벤트, 비동기 Supabase CRUD 흐름을 한 서비스에서 확인합니다.</p>
      <div className="actions">
        <Link to="/items"><Button>카드 목록</Button></Link>
        <Link to="/items/new"><Button variant="secondary">새 카드</Button></Link>
      </div>
      <Card>
        <h2>핵심 학습 흐름</h2>
        <p>라우팅 → 컴포넌트 → 상태 → 이벤트 → 원격 요청 → 렌더링 변화를 연결합니다.</p>
      </Card>
    </section>
  );
}
