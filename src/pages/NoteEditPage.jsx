import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { NoteForm } from '../components/NoteForm'
import { PageHeader } from '../components/PageHeader'
import { useNote } from '../hooks/useNote'
import { updateNote } from '../services/notes'

export function NoteEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { note, loading, error, reload } = useNote(id)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const updated = await updateNote(id, values)
      navigate(`/notes/${updated.id}`)
    } catch (err) {
      setSubmitError(err?.message || '노트를 수정하지 못했습니다.')
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingState label="수정할 노트를 불러오는 중입니다..." />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!note) return <ErrorState message="수정할 노트를 찾을 수 없습니다." />

  return (
    <section>
      <PageHeader title="노트 수정" description="현재 값을 폼 state로 복사한 뒤 수정 결과를 원격 저장합니다." />
      <NoteForm initialValue={note} submitLabel="수정 저장" onSubmit={handleSubmit} submitting={submitting} submitError={submitError} />
    </section>
  )
}
