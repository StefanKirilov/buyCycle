import styles from "./dialog.module.css";

export default function Dialog({ message, onDialog }: any) {
  return (
    <div className={styles.wrapperDialog}>
      <div className={styles.insideWrapperDialog}>
        <h3 className={styles.message}>{message}</h3>
        <div className={styles.wrapperButtons}>
          <button onClick={() => onDialog(true)} className={styles.yes}>
            Да
          </button>
          <button onClick={() => onDialog(false)} className={styles.no}>
            Не
          </button>
        </div>
      </div>
    </div>
  );
}
