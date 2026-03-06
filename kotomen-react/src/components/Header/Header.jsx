import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const isProjects = location.pathname.startsWith('/projects');

  const isActive = (path) => location.pathname === path ? styles.active : '';
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo} onClick={closeMobileMenu}>
          KOTOMEN
          <span>// FULL-STACK PRODUCT ENGINEER</span>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/" className={`${styles.navLink} ${isHome ? styles.active : ''}`}>Главная</Link>
          <Link to="/about" className={`${styles.navLink} ${isActive('/about')}`}>О себе</Link>
          <Link to="/projects" className={`${styles.navLink} ${isProjects ? styles.active : ''}`}>Проекты</Link>
        </div>
        <div className={styles.navRight}>
          <div className={styles.navStatus}>
            <div className={styles.statusDot} />
            AVAILABLE
          </div>
          <button
            type="button"
            className={`${styles.burgerButton} ${isMobileMenuOpen ? styles.burgerOpen : ''}`}
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <button
        type="button"
        className={`${styles.mobileBackdrop} ${isMobileMenuOpen ? styles.mobileBackdropVisible : ''}`}
        aria-label="Закрыть меню"
        onClick={closeMobileMenu}
      />

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <Link to="/" className={`${styles.mobileNavLink} ${isHome ? styles.active : ''}`} onClick={closeMobileMenu}>Главная</Link>
        <Link to="/about" className={`${styles.mobileNavLink} ${isActive('/about')}`} onClick={closeMobileMenu}>О себе</Link>
        <Link to="/projects" className={`${styles.mobileNavLink} ${isProjects ? styles.active : ''}`} onClick={closeMobileMenu}>Проекты</Link>
      </div>
    </>
  );
}
