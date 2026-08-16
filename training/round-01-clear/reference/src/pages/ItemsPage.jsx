import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { EmptyState, ErrorState, Input, LoadingState } from '../components/ui';
import { ItemCard } from '../components/ItemCard';
import { useItems } from '../hooks/useItems';

export function ItemsPage() {
  const { items, loading, error, reload } = useItems();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) =>
      `${item.title} ${item.content} ${item.category}`.toLowerCase().includes(keyword),
    );
  }, [items, query]);

  if (loading) return <LoadingState message="학습 카드를 불러오는 중입니다." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">Remote data</p><h1>학습 카드</h1></div>
        <Link to="/items/new">새 카드 등록</Link>
      </div>
      <Input id="search" label="목록 필터" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제목/내용/카테고리" />
      {filteredItems.length === 0 ? (
        <EmptyState message={items.length === 0 ? '저장된 카드가 없습니다.' : '검색 결과가 없습니다.'} action={<Link to="/items/new">첫 카드 만들기</Link>} />
      ) : (
        <div className="card-grid">{filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}</div>
      )}
    </section>
  );
}
