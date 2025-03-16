import { Router } from "express";
import { loginAgent, logOut, registerAgent, updateAgent } from "../controllers/agent.controller.js";

const router = Router();

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.post("/logout", logOut);
router.post("/update/:agentId", updateAgent);

export default router;
