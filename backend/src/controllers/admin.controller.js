import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";
import { Admin } from "../models/admin.model.js";

/**
 * @desc Register a new admin
 * @mainRoute /api/v1/admin
 * @route POST /register
 * @access Public
 */
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const existingUser = await Admin.findOne({ email }).lean();
  if (existingUser) {
    throw new ApiError(400, "Admin already exists");
  }

  const user = new User({
    name,
    email,
    mobile,
    password,
  });

  // Save user to database
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, [], "Admin registered successfully"));
});
