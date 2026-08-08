import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteForm } from '../components/NoteForm'
import { PageHeader } from '../components/PageHeader'
import { createNote } from '../services/notes'

export function NewNotePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const created = await createNote(values)
      navigate(`/notes/${created.id}`)
    } catch (err) {
      setSubmitError(err?.message || '노트를 저장하지 못했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <section>
      <PageHeader title="새 노트" description="controlled input으로 입력 상태를 관리하고 Supabase에 저장합니다." />
      <NoteForm submitLabel="노트 저장" onSubmit={handleSubmit} submitting={submitting} submitError={submitError} />
    </section>
  )
}
