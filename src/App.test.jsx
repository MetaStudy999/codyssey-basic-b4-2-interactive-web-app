import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App routing', () => {
  it('홈 라우트를 렌더링한다', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Learning Notes' })).toBeInTheDocument()
  })

  it('잘못된 주소는 Not Found 페이지로 이동한다', () => {
    render(<MemoryRouter initialEntries={['/wrong-path']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: '404 - Not Found' })).toBeInTheDocument()
  })
})
