import { Link } from 'react-router-dom';

import { Card } from './ui';

export function ItemCard({ item }) {
  return (
    <Card>
      <p className="eyebrow">{item.category}</p>
      <h2><Link to={`/items/${item.id}`}>{item.title}</Link></h2>
      <p>{item.content.length > 120 ? `${item.content.slice(0, 120)}…` : item.content}</p>
      <Link to={`/items/${item.id}`}>상세 보기</Link>
    </Card>
  );
}
