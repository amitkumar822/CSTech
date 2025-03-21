import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const isAdminAuth = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.jwtToken;

  if (!token) {
    throw new ApiError(401, "User Not Authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "admin") {
    throw new ApiError(403, "Unauthorized Access");
  }

  req.adminId = user._id;

  next();
});

export const isAgentAuth = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.jwtToken;

  if (!token) {
    throw new ApiError(401, "User Not Authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "agent") {
    throw new ApiError(403, "Unauthorized Access");
  }

  next();
});

export const isUserLoggedIn = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.jwtToken;

  if (!token) {
    throw new ApiError(401, "User Not Authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "admin" && user.role !== "agent") {
    throw new ApiError(403, "Unauthorized Access");
  }

  req.userId = user._id;
  next();
});
