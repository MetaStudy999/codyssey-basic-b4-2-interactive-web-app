export function StatusBanner({ tone = 'info', children }) {
  return <div className={`banner banner--${tone}`} role="status">{children}</div>
}
