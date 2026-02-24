import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isActive = (path) => location.pathname === path ? styles.active : '';

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLogo}>
        KOTOMEN
        <span>// FULL-STACK PRODUCT ENGINEER</span>
      </Link>
      <div className={styles.navLinks}>
        <Link to="/" className={`${styles.navLink} ${isHome ? styles.active : ''}`}>Главная</Link>
        <Link to="/about" className={`${styles.navLink} ${isActive('/about')}`}>О себе</Link>
        <Link to="/projects" className={`${styles.navLink} ${isActive('/projects')}`}>Проекты</Link>

        <Link to="/#contact" className={styles.navLink}>Контакт</Link>
      </div>
      <div className={styles.navStatus}>
        <div className={styles.statusDot} />
        AVAILABLE
      </div>
    </nav>
  );
}
