import { NavLink } from 'react-router-dom';

export function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">Study Cards</NavLink>
        <nav aria-label="주요 메뉴">
          <NavLink to="/items">카드 목록</NavLink>
          <NavLink to="/items/new">새 카드</NavLink>
          <NavLink to="/about">소개</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
