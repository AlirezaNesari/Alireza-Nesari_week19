import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import ali from "../assets/ali.png";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [searchParams, setSearchParams] = useSearchParams();

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
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;