import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNotes } from './useNotes'
import * as notesService from '../services/notes'

vi.mock('../services/notes', () => ({ listNotes: vi.fn() }))

const sampleNotes = [
  { id: '1', title: 'React', content: 'state', category: 'React' },
  { id: '2', title: 'CSS Grid', content: 'layout', category: 'CSS' },
]

describe('useNotes', () => {
  beforeEach(() => vi.clearAllMocks())

  it('원격 목록의 loading → success 상태를 관리한다', async () => {
    notesService.listNotes.mockResolvedValue(sampleNotes)
    const { result } = renderHook(() => useNotes())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.notes).toHaveLength(2)
    expect(result.current.error).toBe('')
  })

  it('조회 실패를 error 상태로 노출한다', async () => {
    notesService.listNotes.mockRejectedValue(new Error('network down'))
    const { result } = renderHook(() => useNotes())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('network down')
  })
})
