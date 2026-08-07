import { Link } from 'react-router-dom'

export function EmptyState({ title = '표시할 데이터가 없습니다.', actionLabel, actionTo }) {
  return (
    <div className="state state--empty">
      <p>{title}</p>
      {actionLabel && actionTo ? <Link className="text-link" to={actionTo}>{actionLabel}</Link> : null}
    </div>
  )
}
