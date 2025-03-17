import { Router } from "express";
import { deleteUser, getAllAgents, loginUser, logOut, registerUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.post("/update/:userId", updateUser);

//^ Agent routes
router.get("/get-all-agents", getAllAgents);
router.delete("/delete/:id", deleteUser);

export default router;
