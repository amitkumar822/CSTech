import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  completeTask,
  deleteTask,
  getAgentTaskById,
  getTaskDistribution,
  uploadTaskFile,
} from "../controllers/agent task/agentTask.controller.js";
import { isAdminAuth, isAgentAuth } from "../middlewares/auth.js";

const router = Router();

//Only Admin access this all routes
router.post("/upload", upload.single("file"), isAdminAuth, uploadTaskFile);
router.get("/get-all-tasks", isAdminAuth, getTaskDistribution);
router.put("/task-delete/:taskId", isAdminAuth, deleteTask);

// Only Agent access this routes
router.get("/get-task-by-id/:agentId", isAgentAuth, getAgentTaskById);
router.put("/mark-task-as-completed/:taskId", isAgentAuth, completeTask);

export default router;
