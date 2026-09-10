import { Outlet } from "react-router-dom";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.layout} dir="rtl">
      <header className={styles.header}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="جستجو کالا"
          />

          <span className={styles.searchIcon}>⌕</span>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            م
          </div>

          <div className={styles.userInfo}>
            <span>میلاد عظمی</span>
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