import { useState } from "react";

import { createProduct } from "../../services/productService";

import styles from "./ProductModal.module.css";

function ProductModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("نام کالا را وارد کنید.");
      return;
    }

    if (
      formData.quantity === "" ||
      Number(formData.quantity) < 0 ||
      !Number.isInteger(Number(formData.quantity))
    ) {
      setError("تعداد موجودی معتبر نیست.");
      return;
    }

    if (formData.price === "" || Number(formData.price) <= 0) {
      setError("قیمت معتبر نیست.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createProduct({
        name: formData.name.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      setFormData({
        name: "",
        quantity: "",
        price: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      setError("ایجاد محصول با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setError("");

    setFormData({
      name: "",
      quantity: "",
      price: "",
    });

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} dir="rtl">
        <h2>ایجاد محصول جدید</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">نام کالا</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="نام کالا"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="quantity">تعداد موجودی</label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="تعداد"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="price">قیمت</label>

            <input
              id="price"
              name="price"
              type="number"
              placeholder="قیمت"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={loading}
            >
              انصراف
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "در حال ایجاد..." : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;