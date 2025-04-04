import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <header className={styles.mainLayout__header}>
        <Link to='/'>
          <h1>MainLayout</h1>
        </Link>
      </header>
      <Outlet />
    </div>
  );
};
