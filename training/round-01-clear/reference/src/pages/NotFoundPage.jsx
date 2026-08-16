import { Link } from 'react-router-dom';

import { ErrorState } from '../components/ui';

export function NotFoundPage() {
  return <ErrorState message="요청한 페이지를 찾을 수 없습니다." onRetry={null} action={<Link to="/">홈으로</Link>} />;
}
