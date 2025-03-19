import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import MobileSidebar from "@/pages/sidebar/MobileSidebar";

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <nav className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center shadow-lg border-b-2">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold">
        <div className="flex items-center gap-2 text-white">
          <h1 className="font-bold">
            <span className="text-yellow-200">CS</span>
            <span className="text-green-200">Tech</span>
          </h1>
        </div>
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

      <div
        className={`md:hidden ${
          isAuthenticated && role === "admin" ? "block" : "hidden"
        }`}
      >
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
