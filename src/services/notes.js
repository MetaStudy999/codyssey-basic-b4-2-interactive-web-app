import { supabaseRequest } from '../lib/supabase'

const TABLE_PATH = '/notes'

export async function listNotes() {
  return (
    (await supabaseRequest(
      `${TABLE_PATH}?select=*&order=created_at.desc`,
      { method: 'GET' },
    )) ?? []
  )
}

export async function getNote(id) {
  const rows = await supabaseRequest(
    `${TABLE_PATH}?id=eq.${encodeURIComponent(id)}&select=*`,
    { method: 'GET' },
  )
  if (!rows?.length) throw new Error('해당 노트를 찾을 수 없습니다.')
  return rows[0]
}

export async function createNote(input) {
  const rows = await supabaseRequest(TABLE_PATH, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      title: input.title.trim(),
      content: input.content.trim(),
      category: input.category,
    }),
  })
  return rows[0]
}

export async function updateNote(id, input) {
  const rows = await supabaseRequest(
    `${TABLE_PATH}?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        title: input.title.trim(),
        content: input.content.trim(),
        category: input.category,
        updated_at: new Date().toISOString(),
      }),
    },
  )
  if (!rows?.length) throw new Error('수정할 노트를 찾을 수 없습니다.')
  return rows[0]
}

export async function deleteNote(id) {
  await supabaseRequest(`${TABLE_PATH}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  })
}
