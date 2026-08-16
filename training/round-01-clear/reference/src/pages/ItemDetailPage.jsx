import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button, ErrorState, LoadingState } from '../components/ui';
import { useItemDetail } from '../hooks/useItemDetail';
import { deleteItem } from '../lib/items';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading, error, reload } = useItemDetail(id);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  if (loading) return <LoadingState message="상세 카드를 불러오는 중입니다." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!item) return <ErrorState message="해당 카드를 찾을 수 없습니다." />;

  async function handleDelete() {
    if (!window.confirm('이 카드를 삭제할까요?')) return;
    setDeleting(true); setDeleteError('');
    try {
      await deleteItem(item.id);
      navigate('/items', { replace: true });
    } catch (err) {
      setDeleteError(err?.message || '삭제에 실패했습니다.');
      setDeleting(false);
    }
  }

  return (
    <article className="detail">
      <p className="eyebrow">{item.category}</p>
      <h1>{item.title}</h1>
      <p className="detail-content">{item.content}</p>
      <p><small>생성: {new Date(item.created_at).toLocaleString()}</small></p>
      {deleteError && <p className="form-error" role="alert">{deleteError}</p>}
      <div className="actions">
        <Link to={`/items/${item.id}/edit`}><Button>수정</Button></Link>
        <Button variant="danger" disabled={deleting} onClick={handleDelete}>{deleting ? '삭제 중…' : '삭제'}</Button>
        <Link to="/items">목록</Link>
      </div>
    </article>
  );
}
