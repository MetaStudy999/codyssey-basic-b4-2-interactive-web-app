import { Link } from 'react-router-dom'

export function NoteCard({ note }) {
  return (
    <article className="note-card">
      <div className="note-card__meta">
        <span>{note.category}</span>
        <time>{new Date(note.created_at).toLocaleDateString('ko-KR')}</time>
      </div>
      <h2><Link to={`/notes/${note.id}`}>{note.title}</Link></h2>
      <p>{note.content.length > 120 ? `${note.content.slice(0, 120)}...` : note.content}</p>
    </article>
  )
}
