import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import DeleteModal from "../../components/DeleteModal/DeleteModal";

import edit from "../../assets/edit.png";
import trash from "../../assets/trash.png";
import setting from "../../assets/setting.png";

import { getProducts } from "../../services/productService";

import styles from "./Products.module.css";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = searchParams.get("name") || "";

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    setPage(currentPage);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({
          page,
          limit: 10,
          ...(search && {
            name: search,
          }),
        });

        setProducts(data.data);

        setPagination({
          totalProducts: data.totalProducts,
          totalPages: data.totalPages,
          limit: data.limit,
        });
      } catch (error) {
        console.error(error);

        setError("دریافت محصولات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search]);

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

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) {
      return;
    }

    setSearchParams({
      ...(search && {
        name: search,
      }),
      page: newPage.toString(),
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <img
            src={setting}
            alt="setting"
            className={styles.setting}
          />

          <h1>مدیریت کالا</h1>
        </div>

        <button
          type="button"
          className={styles.addButton}
        >
          افزودن محصول
        </button>
      </div>

      {loading && (
        <div className={styles.message}>
          در حال دریافت محصولات...
        </div>
      )}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
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

                    <td>{product.id}</td>

                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editButton}
                        >
                          <img
                            src={edit}
                            alt="edit"
                          />
                        </button>

                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() =>
                            openDeleteModal(product)
                          }
                        >
                          <img
                            src={trash}
                            alt="trash"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      محصولی پیدا نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              onClick={() => changePage(3)}
              disabled={pagination.totalPages < 3}
            >
              ۳
            </button>

            <button
              type="button"
              onClick={() => changePage(2)}
              disabled={pagination.totalPages < 2}
            >
              ۲
            </button>

            <button
              type="button"
              className={
                page === 1
                  ? styles.activePage
                  : ""
              }
              onClick={() => changePage(1)}
            >
              ۱
            </button>
          </div>
        </>
      )}

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