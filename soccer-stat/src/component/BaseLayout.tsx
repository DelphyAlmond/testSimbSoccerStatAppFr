import { Outlet, Link } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="app-container">
      <header className="main-header">
        <nav>
          <Link to="/">Лиги</Link>
          <Link to="/teams">Команды</Link>
        </nav>
      </header>
      
      <main className="main-content">
        {/* >> rendering << */}
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;