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
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <h1>مدیریت کالا</h1>

          <button
            type="button"
            className={styles.settingsButton}
          >
            ⚙
          </button>
        </div>

        <button
          type="button"
          className={styles.addButton}
        >
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
                    <button
                      type="button"
                      className={styles.editButton}
                    >
                      ♢
                    </button>

                    <button
                      type="button"
                      className={styles.deleteButton}
                    >
                      ♧
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <div className={styles.pagination}>
  <button
    type="button"
    className={styles.activePage}
  >
    ۱
  </button>

  <button type="button">۲</button>

  <button type="button">۳</button>
</div>
    </div>
  );
}

export default Products;