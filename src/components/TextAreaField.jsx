export function TextAreaField({ id, label, value, onChange, error = '', rows = 7 }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} onChange={onChange} rows={rows} aria-invalid={Boolean(error)} />
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  )
}
