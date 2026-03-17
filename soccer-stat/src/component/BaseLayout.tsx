import { Outlet, NavLink, Link } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="header-content">
          {/* Логотип теперь слева */}
          <Link to="/" className="logo">FIFA</Link>
          
          {/* Навигация теперь справа и с поддержкой активного состояния */}
          <nav className="nav-tabs">
            <NavLink to="/" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
              Лиги
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
              Команды
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;