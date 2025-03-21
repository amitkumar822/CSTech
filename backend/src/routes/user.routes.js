import { Router } from "express";
import {
  deleteUser,
  getAllAgents,
  loginUser,
  logOut,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { isAdminAuth, isUserLoggedIn } from "../middlewares/auth.js";

const router = Router();

router.post("/register", isAdminAuth, registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.put("/update/:userId", updateUser);

//^ Agent routes
router.get("/get-all-agents", isAdminAuth, getAllAgents);
router.delete("/delete/:id", isAdminAuth, deleteUser);

export default router;
