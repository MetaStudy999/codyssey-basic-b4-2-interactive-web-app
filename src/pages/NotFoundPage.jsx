import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function NotFoundPage() {
  return (
    <section>
      <PageHeader title="404 - Not Found" description="요청한 페이지를 찾을 수 없습니다." />
      <Link className="text-link" to="/">홈으로 돌아가기</Link>
    </section>
  )
}
