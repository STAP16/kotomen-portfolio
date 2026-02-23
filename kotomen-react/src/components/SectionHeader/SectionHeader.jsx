import styles from './SectionHeader.module.css';

export default function SectionHeader({ tag, num }) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.tag}>{tag}</div>
      <div className={styles.line} />
      <div className={styles.num}>{num}</div>
    </div>
  );
}
