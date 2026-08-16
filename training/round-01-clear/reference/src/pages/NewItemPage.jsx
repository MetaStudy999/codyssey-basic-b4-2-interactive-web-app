import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ItemForm } from '../components/ItemForm';
import { createItem } from '../lib/items';

export function NewItemPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(values) {
    setSubmitting(true); setError('');
    try {
      const created = await createItem(values);
      navigate(`/items/${created.id}`, { replace: true });
    } catch (err) {
      setError(err?.message || '등록에 실패했습니다.');
      setSubmitting(false);
    }
  }

  return <section><h1>새 학습 카드</h1><ItemForm onSubmit={handleSubmit} submitting={submitting} serverError={error} /></section>;
}
