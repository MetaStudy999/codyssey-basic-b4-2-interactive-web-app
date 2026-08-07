import { useMemo, useState } from 'react'
import { Button } from './Button'
import { SelectField } from './SelectField'
import { StatusBanner } from './StatusBanner'
import { TextAreaField } from './TextAreaField'
import { TextField } from './TextField'

const CATEGORIES = ['React', 'JavaScript', 'CSS', 'Web', 'Other']

function validate(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = '제목을 입력하세요.'
  if (!values.content.trim()) errors.content = '내용을 입력하세요.'
  return errors
}

export function NoteForm({ initialValue, submitLabel, onSubmit, submitting = false, submitError = '' }) {
  const [values, setValues] = useState({
    title: initialValue?.title ?? '',
    content: initialValue?.content ?? '',
    category: initialValue?.category ?? CATEGORIES[0],
  })
  const [touched, setTouched] = useState(false)

  const errors = useMemo(() => validate(values), [values])
  const preview = values.title.trim() || '제목을 입력하면 여기에 미리보기가 나타납니다.'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched(true)
    if (Object.keys(errors).length) return
    await onSubmit(values)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      {submitError ? <StatusBanner tone="error">{submitError}</StatusBanner> : null}
      <TextField
        id="title"
        label="제목 *"
        value={values.title}
        onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
        error={touched ? errors.title : ''}
        placeholder="예: useEffect 의존성 배열 정리"
      />
      <TextAreaField
        id="content"
        label="내용 *"
        value={values.content}
        onChange={(event) => setValues((current) => ({ ...current, content: event.target.value }))}
        error={touched ? errors.content : ''}
      />
      <SelectField
        id="category"
        label="카테고리"
        value={values.category}
        onChange={(event) => setValues((current) => ({ ...current, category: event.target.value }))}
        options={CATEGORIES}
      />
      <div className="preview" aria-live="polite">
        <strong>입력 미리보기</strong>
        <span>{preview}</span>
      </div>
      <Button type="submit" disabled={submitting}>{submitting ? '저장 중...' : submitLabel}</Button>
    </form>
  )
}
