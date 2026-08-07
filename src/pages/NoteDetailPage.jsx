import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PageHeader } from '../components/PageHeader'
import { StatusBanner } from '../components/StatusBanner'
import { useNote } from '../hooks/useNote'
import { deleteNote } from '../services/notes'

export function NoteDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { note, loading, error, reload } = useNote(id)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteNote(id)
      navigate('/notes', { replace: true })
    } catch (err) {
      setDeleteError(err?.message || '삭제 요청에 실패했습니다.')
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  if (loading) return <LoadingState label="노트 상세를 불러오는 중입니다..." />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!note) return <ErrorState message="해당 노트를 찾을 수 없습니다." />

  return (
    <section>
      <PageHeader
        title={note.title}
        description={`${note.category} · ${new Date(note.created_at).toLocaleString('ko-KR')}`}
        actions={<Link className="button button--secondary" to={`/notes/${id}/edit`}>수정</Link>}
      />
      {deleteError ? <StatusBanner tone="error">{deleteError}</StatusBanner> : null}
      <article className="detail-card"><p>{note.content}</p></article>
      <div className="detail-actions">
        <Link className="text-link" to="/notes">목록으로</Link>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>삭제</Button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="이 노트를 삭제할까요?"
        busy={deleting}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}
