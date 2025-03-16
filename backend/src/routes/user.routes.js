import { Router } from "express";
import { loginUser, logOut, registerUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.post("/update/:userId", updateUser);

export default router;
