import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { NoteList } from '../components/NoteList'
import { PageHeader } from '../components/PageHeader'
import { TextField } from '../components/TextField'
import { useNotes } from '../hooks/useNotes'

export function NotesPage() {
  const { notes, totalCount, query, setQuery, loading, error, reload } = useNotes()

  return (
    <section>
      <PageHeader
        title="노트 목록"
        description={`원격 데이터 ${totalCount}개를 불러왔습니다.`}
        actions={<Link className="button button--primary" to="/notes/new">새 노트</Link>}
      />
      <TextField id="search" label="목록 필터" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제목, 내용, 카테고리 검색" />
      {loading ? <LoadingState label="Supabase에서 노트를 불러오는 중입니다..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={reload} /> : null}
      {!loading && !error && notes.length === 0 ? (
        <EmptyState
          title={query ? '검색 조건에 맞는 노트가 없습니다.' : '아직 저장된 노트가 없습니다.'}
          actionLabel={query ? undefined : '첫 노트 만들기'}
          actionTo={query ? undefined : '/notes/new'}
        />
      ) : null}
      {!loading && !error && notes.length > 0 ? <NoteList notes={notes} /> : null}
    </section>
  )
}
