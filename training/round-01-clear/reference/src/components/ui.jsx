export function Button({ children, type = 'button', disabled = false, onClick, variant = 'primary' }) {
  return <button className={`button button-${variant}`} type={type} disabled={disabled} onClick={onClick}>{children}</button>;
}

export function Input({ id, label, value, onChange, error, ...props }) {
  return <div className="field"><label htmlFor={id}>{label}</label><input id={id} value={value} onChange={onChange} {...props} />{error && <p className="field-error">{error}</p>}</div>;
}

export function TextArea({ id, label, value, onChange, error, ...props }) {
  return <div className="field"><label htmlFor={id}>{label}</label><textarea id={id} value={value} onChange={onChange} {...props} />{error && <p className="field-error">{error}</p>}</div>;
}

export function Card({ children }) {
  return <article className="card">{children}</article>;
}

export function LoadingState({ message = '불러오는 중입니다.' }) {
  return <div className="state" role="status">{message}</div>;
}

export function ErrorState({ message, onRetry }) {
  return <div className="state state-error" role="alert"><p>{message}</p>{onRetry && <Button onClick={onRetry}>다시 시도</Button>}</div>;
}

export function EmptyState({ message = '데이터가 없습니다.', action }) {
  return <div className="state"><p>{message}</p>{action}</div>;
}
