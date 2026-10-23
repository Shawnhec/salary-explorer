import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to="/">Salary Explorer</Link>
        </h1>
      </aside>
      
      <main className="content">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
