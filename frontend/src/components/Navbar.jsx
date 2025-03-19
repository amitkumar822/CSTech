import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  console.log(isAuthenticated, role);
  

  return (
    <nav className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center shadow-lg border-b-2">
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
