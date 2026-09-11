import { useEffect, useState } from "react";
import { updateProduct } from "../../services/productService";
import styles from "./EditProductModal.module.css";

function EditProductModal({ isOpen, product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name || "",
      quantity: product.quantity ?? "",
      price: product.price ?? "",
    });

    setError("");
  }, [product]);

  if (!isOpen || !product) return null;

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

      await updateProduct(product.id, {
        name: formData.name.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      setError("ویرایش محصول با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setError("");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} dir="rtl">
        <h2>ویرایش اطلاعات</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="edit-name">نام کالا</label>

            <input
              id="edit-name"
              name="name"
              type="text"
              placeholder="نام کالا"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-quantity">تعداد موجودی</label>

            <input
              id="edit-quantity"
              name="quantity"
              type="number"
              placeholder="تعداد"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-price">قیمت</label>

            <input
              id="edit-price"
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
              {loading ? "در حال ذخیره..." : "ثبت اطلاعات جدید"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;