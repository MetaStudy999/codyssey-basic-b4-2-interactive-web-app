import { NoteCard } from './NoteCard'

export function NoteList({ notes }) {
  return <div className="note-grid">{notes.map((note) => <NoteCard key={note.id} note={note} />)}</div>
}
