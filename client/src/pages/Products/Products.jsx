import { useEffect } from "react";
import api from "../../services/api";

function Products() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await api.get("/products");

        console.log("Products API:", response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    testApi();
  }, []);

  return <h2>Products Page</h2>;
}

export default Products;