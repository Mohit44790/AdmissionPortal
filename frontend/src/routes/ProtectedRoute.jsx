import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // or redux auth state

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // ✅ THIS IS THE FIX
};

export default ProtectedRoute;
