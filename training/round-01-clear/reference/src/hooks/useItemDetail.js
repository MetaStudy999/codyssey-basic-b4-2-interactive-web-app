import { useCallback, useEffect, useState } from 'react';

import { getItem } from '../lib/items';

export function useItemDetail(id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItem(await getItem(id));
    } catch (err) {
      setError(err?.message || '상세 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { item, loading, error, reload };
}
