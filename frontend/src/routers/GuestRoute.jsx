import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    // ✅ If logged in, redirect to dashboard (if admin) or home
    return (
      <Navigate
        to={
          role === "admin"
            ? "/dashboard"
            : role === "agent"
            ? "/agent-dashboard"
            : "/"
        }
        replace
      />
    );
  }

  return <Outlet />; // Render login page if not logged in
};

export default GuestRoute;
