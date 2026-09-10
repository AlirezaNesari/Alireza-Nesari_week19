import styles from "./DeleteModal.module.css";
import logo from "../../assets/close.png";

function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>
          <img src={logo} alt="Union" />
        </div>

        <p className={styles.message}>آیا از حذف این محصول مطمئنید؟</p>

        {productName && <p className={styles.productName}>{productName}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onConfirm}
          >
            حذف
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
