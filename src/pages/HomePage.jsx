import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function HomePage() {
  return (
    <section>
      <PageHeader
        title="Learning Notes"
        description="React의 라우팅, 상태, 이벤트, 비동기 데이터 흐름을 직접 확인하는 학습 노트 SPA입니다."
      />
      <div className="hero-panel">
        <p>Supabase에 노트를 저장하고 목록 → 상세 → 등록 → 수정 → 삭제 흐름을 한 화면 경험으로 연결합니다.</p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/notes">노트 목록 보기</Link>
          <Link className="button button--secondary" to="/notes/new">새 노트 만들기</Link>
        </div>
      </div>
    </section>
  )
}
