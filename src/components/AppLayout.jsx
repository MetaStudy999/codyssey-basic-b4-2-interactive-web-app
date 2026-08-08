import { NavLink, Outlet } from 'react-router-dom'

function navClass({ isActive }) {
  return isActive ? 'nav-link nav-link--active' : 'nav-link'
}

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">Learning Notes</NavLink>
        <nav aria-label="주요 메뉴">
          <NavLink className={navClass} to="/notes">노트</NavLink>
          <NavLink className={navClass} to="/notes/new">새 노트</NavLink>
          <NavLink className={navClass} to="/about">학습 포인트</NavLink>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
      <footer className="site-footer">Codyssey Basic B4-2 · React SPA</footer>
    </div>
  )
}
