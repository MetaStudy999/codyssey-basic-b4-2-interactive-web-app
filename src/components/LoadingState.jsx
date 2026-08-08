export function LoadingState({ label = '불러오는 중입니다...' }) {
  return <div className="state state--loading" role="status">{label}</div>
}
