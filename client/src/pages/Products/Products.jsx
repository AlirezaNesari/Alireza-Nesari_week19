import { useState } from "react";

import DeleteModal from "../../components/DeleteModal/DeleteModal";
import edit from "../../assets/edit.png";
import trash from "../../assets/trash.png";
import setting from "../../assets/setting.png";

import styles from "./Products.module.css";

const products = [
  {
    id: 1,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
  {
    id: 2,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
  {
    id: 3,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
  {
    id: 4,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
  {
    id: 5,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
  {
    id: 6,
    name: "تیشرت طرح انگولار",
    quantity: 293,
    price: "۹۰ هزار تومان",
    productId: "90uf9g9h7895467g974",
  },
];

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
  };

  const confirmDelete = () => {
    console.log("Delete product:", selectedProduct);

    closeDeleteModal();
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <img src={setting} alt="setting" className={styles.setting} />
          <h1>مدیریت کالا</h1>
        </div>

        <button type="button" className={styles.addButton}>
          افزودن محصول
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>{product.quantity}</td>

                <td>{product.price}</td>

                <td>{product.productId}</td>

                <td>
                  <div className={styles.actions}>
                    <button type="button" className={styles.editButton}>
                      <img src={edit} alt="edit" />
                    </button>

                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => openDeleteModal(product)}
                    >
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button type="button">۳</button>

        <button type="button">۲</button>

        <button type="button" className={styles.activePage}>
          ۱
        </button>
      </div>

      <DeleteModal
        isOpen={Boolean(selectedProduct)}
        productName={selectedProduct?.name}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Products;
