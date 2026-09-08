import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;