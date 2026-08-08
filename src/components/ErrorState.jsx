import { Button } from './Button'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <p>{message}</p>
      {onRetry ? <Button variant="secondary" onClick={onRetry}>다시 시도</Button> : null}
    </div>
  )
}
