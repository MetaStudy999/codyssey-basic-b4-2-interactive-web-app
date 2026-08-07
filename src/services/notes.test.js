import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createNote, deleteNote, getNote, listNotes, updateNote } from './notes'

describe('notes service Supabase REST CRUD', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-anon-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('목록을 GET으로 조회한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: '1', title: 'A' }]), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(listNotes()).resolves.toHaveLength(1)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/rest/v1/notes?select=*&order=created_at.desc'),
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('상세를 id 필터로 조회한다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: 'abc', title: 'A' }]), { status: 200 }),
    ))
    await expect(getNote('abc')).resolves.toMatchObject({ id: 'abc' })
  })

  it('등록은 POST + representation을 사용한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: 'new', title: 'A', content: 'B', category: 'React' }]), { status: 201 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await createNote({ title: ' A ', content: ' B ', category: 'React' })
    const [, options] = fetchMock.mock.calls[0]
    expect(options.method).toBe('POST')
    expect(options.headers.Prefer).toBe('return=representation')
    expect(JSON.parse(options.body)).toMatchObject({ title: 'A', content: 'B' })
  })

  it('수정은 PATCH를 사용한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: 'abc', title: 'Updated' }]), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await updateNote('abc', { title: 'Updated', content: 'Body', category: 'Web' })
    expect(fetchMock.mock.calls[0][1].method).toBe('PATCH')
  })

  it('삭제는 DELETE를 사용한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)

    await deleteNote('abc')
    expect(fetchMock.mock.calls[0][1].method).toBe('DELETE')
  })
})
