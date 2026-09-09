import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/products" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;