import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <header>
        <h1>Admin Panel</h1>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;