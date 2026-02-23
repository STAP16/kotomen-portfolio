import styles from './Footer.module.css';

export default function Footer({ copy = '© 2025 // ALL SYSTEMS OPERATIONAL' }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>KOTOMEN</div>
      <div className={styles.copy}>{copy}</div>
    </footer>
  );
}
