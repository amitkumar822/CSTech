import { useLogoutUserMutation } from "@/redux/api/authUserApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
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
    <div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <span className="flex gap-2 justify-center items-center text-sm">
              <Loader2 size={18} className="animate-spin" />
              Plase Wait
            </span>
          ) : (
            "Logout"
          )}
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
  );
};

export default Logout;
