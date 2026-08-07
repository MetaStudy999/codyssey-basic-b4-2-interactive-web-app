export function TextField({ id, label, value, onChange, error = '', placeholder = '' }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} />
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  )
}
