import { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import ali from "../assets/ali.png";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("name") || ""
  );

  useEffect(() => {
    setSearchValue(searchParams.get("name") || "");
  }, [searchParams]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("name", value.trim());
    } else {
      params.delete("name");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.layout} dir="rtl">
      <header className={styles.header}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>⌕</span>

          <input
            type="text"
            placeholder="جستجو کالا"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles.userProfile}>
          <img
            src={ali}
            alt="ali"
            className={styles.avatar}
          />

          <div className={styles.userInfo}>
            <span>علیرضا نثاری</span>
            <small>مدیر</small>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            خروج
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;