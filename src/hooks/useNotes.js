import { useCallback, useEffect, useMemo, useState } from 'react'
import { listNotes } from '../services/notes'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setNotes(await listNotes())
    } catch (err) {
      setError(err?.message || '노트 목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return notes
    return notes.filter((note) =>
      [note.title, note.content, note.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized)),
    )
  }, [notes, query])

  return {
    notes: filteredNotes,
    totalCount: notes.length,
    query,
    setQuery,
    loading,
    error,
    reload,
  }
}
