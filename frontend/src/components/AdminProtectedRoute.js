import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin-signin" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // 🔐 Check role
    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (err) {
    return <Navigate to="/admin-signin" replace />;
  }
}