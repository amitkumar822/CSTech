import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/authSlice"; // Update path if needed
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user, isAuthenticated);
  

  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center shadow-lg">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Menu size={24} />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

        {/* Conditional Rendering for Login/Logout */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
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
