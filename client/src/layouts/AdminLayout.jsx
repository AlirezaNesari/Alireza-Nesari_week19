import { Outlet } from "react-router-dom";
import ali from "../assets/ali.png";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.layout} dir="rtl">
      <header className={styles.header}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>⌕</span>
          <input type="text" placeholder="جستجو کالا" />
          
        </div>

        <div className={styles.userProfile}>
          <img src={ali} alt="ali" className={styles.avatar} />

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
