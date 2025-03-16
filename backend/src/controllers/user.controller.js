import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";

/**
 * @desc Register a new user
 * @mainRoute /api/v1/users
 * @route POST /register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = new User({
    name,
    email,
    mobile,
    password,
    role,
  });

  // Save user to database
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, [], "User registered successfully"));
});

/**
 * @desc User Login
 * @route POST /login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT Token
  const token = await createTokensAndSaveCookies(user._id, res, "user");

  // Convert to plain object and remove password
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  delete userWithoutPassword.refreshToken;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userWithoutPassword, token },
        "User Login Successfully"
      )
    );
});

/**
 * @desc User Logout
 * @route POST /logout
 * @access Public
 */
export const logOut = asyncHandler(async (req, res) => {
  //   const { userId } = req.user;

  //   // Remove refresh token from database
  //   await User.findByIdAndUpdate(
  //     userId,
  //     { $set: { refreshToken: "", token: "" } },
  //     { new: true }
  //   );

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User Logged Out Successfully"));
});

/**
 * @desc Update User Profile
 * @route PUT update/:userId
 * @access Private (User/Admin)
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res.json(
    new ApiResponse(200, updatedUser, "User profile updated successfully")
  );
});
