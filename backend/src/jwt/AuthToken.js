import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createTokensAndSaveCookies = async (userId, res) => {
  // Generate Jwt Token
  const jwtToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );

  res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  await User.findByIdAndUpdate(userId, { jwtToken });

  return { jwtToken };
};

export default createTokensAndSaveCookies;
