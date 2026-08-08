import { useCallback, useEffect, useState } from 'react'
import { getNote } from '../services/notes'

export function useNote(id) {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setNote(await getNote(id))
    } catch (err) {
      setError(err?.message || '노트를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    reload()
  }, [reload])

  return { note, loading, error, reload }
}
