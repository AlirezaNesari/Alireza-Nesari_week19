import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route path="/products" element={<Products />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/products" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;