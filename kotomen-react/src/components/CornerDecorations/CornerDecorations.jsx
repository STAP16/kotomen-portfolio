import styles from './CornerDecorations.module.css';

export default function CornerDecorations({ corners = ['tl', 'tr', 'bl', 'br'] }) {
  return (
    <>
      {corners.includes('tl') && <div className={styles.cornerTl} />}
      {corners.includes('tr') && <div className={styles.cornerTr} />}
      {corners.includes('bl') && <div className={styles.cornerBl} />}
      {corners.includes('br') && <div className={styles.cornerBr} />}
    </>
  );
}
