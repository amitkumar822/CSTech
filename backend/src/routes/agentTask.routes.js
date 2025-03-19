import { Router } from "express";
import upload from "../middlewares/upload.js";
import { completeTask, getTaskDistribution, uploadTaskFile } from "../controllers/agent task/agentTask.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadTaskFile);
router.get("/get-all-tasks", getTaskDistribution);
router.put("/task-complete/:taskId", completeTask);

export default router;