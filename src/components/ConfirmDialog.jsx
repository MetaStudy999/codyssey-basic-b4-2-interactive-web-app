import { Button } from './Button'

export function ConfirmDialog({ open, title, busy = false, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>이 작업은 되돌릴 수 없습니다.</p>
        <div className="dialog__actions">
          <Button variant="secondary" disabled={busy} onClick={onCancel}>취소</Button>
          <Button variant="danger" disabled={busy} onClick={onConfirm}>{busy ? '삭제 중...' : '삭제'}</Button>
        </div>
      </div>
    </div>
  )
}
