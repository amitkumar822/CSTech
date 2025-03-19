import { Router } from "express";
import upload from "../middlewares/upload.js";
import { getTaskDistribution, uploadTaskFile } from "../controllers/agent task/agentTask.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadTaskFile);
router.get("/get-all-tasks", getTaskDistribution);

export default router;