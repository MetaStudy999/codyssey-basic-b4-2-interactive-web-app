import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ItemForm } from '../components/ItemForm';
import { ErrorState, LoadingState } from '../components/ui';
import { useItemDetail } from '../hooks/useItemDetail';
import { updateItem } from '../lib/items';

export function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading, error, reload } = useItemDetail(id);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (loading) return <LoadingState message="수정할 카드를 불러오는 중입니다." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!item) return <ErrorState message="해당 카드를 찾을 수 없습니다." />;

  async function handleSubmit(values) {
    setSubmitting(true); setSubmitError('');
    try {
      await updateItem(item.id, values);
      navigate(`/items/${item.id}`, { replace: true });
    } catch (err) {
      setSubmitError(err?.message || '수정에 실패했습니다.');
      setSubmitting(false);
    }
  }

  return <section><h1>학습 카드 수정</h1><ItemForm initialValue={item} onSubmit={handleSubmit} submitting={submitting} serverError={submitError} /></section>;
}
