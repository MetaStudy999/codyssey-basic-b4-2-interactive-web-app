import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { NoteForm } from './NoteForm'

describe('NoteForm', () => {
  it('필수값 오류를 표시하고 유효하지 않으면 제출하지 않는다', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<NoteForm submitLabel="저장" onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: '저장' }))

    expect(screen.getByText('제목을 입력하세요.')).toBeInTheDocument()
    expect(screen.getByText('내용을 입력하세요.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('입력 이벤트가 미리보기 렌더링을 바꾼다', async () => {
    const user = userEvent.setup()
    render(<NoteForm submitLabel="저장" onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('제목 *'), 'React state 흐름')

    expect(screen.getByText('React state 흐름')).toBeInTheDocument()
  })

  it('submitting 상태에서 진행 문구와 disabled 버튼을 보여준다', () => {
    render(<NoteForm submitLabel="저장" onSubmit={vi.fn()} submitting />)
    expect(screen.getByRole('button', { name: '저장 중...' })).toBeDisabled()
  })
})
