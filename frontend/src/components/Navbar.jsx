import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/authSlice"; // Update path if needed
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader2, Menu } from "lucide-react";
import { useLogoutUserMutation } from "@/redux/api/authUserApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Logout from "./Logout";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isSuccess, error, isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(userLoggedOut());
    navigate("/login");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Logout Successfull");
    } else if (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  }, [error, isSuccess]);

  return (
    <nav className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center shadow-lg">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold">
        CSTech
      </Link>

      {/* Desktop Menu */}
      <div className="flex gap-4">
        {/* Conditional Rendering for Login/Logout */}
        {isAuthenticated ? (
          <div className="md:block hidden">
            <Logout />
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
