import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  // Get agent information from Redux state
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect if the user does not have the required role
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
