import styles from "./index.module.scss";

export const Modal = ({
  active,
  canConfirm,
  children,
  confirmText = "Submit",
  onConfirm,
  onDismiss,
}) => {
  if (active) {
    return (
      <div className={styles.container}>
        <div className={styles.dismissArea} onClick={onDismiss} />
        <div className={styles.modal}>
          <button className={styles.close} onClick={onDismiss}>
            x
          </button>
          {children}
          <button
            className={styles.confirm}
            onClick={onConfirm}
            disabled={canConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    );
  }
  return null;
};
