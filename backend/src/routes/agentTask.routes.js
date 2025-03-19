import { Router } from "express";
import upload from "../middlewares/upload.js";
import {
  completeTask,
  deleteTask,
  getAgentTaskById,
  getTaskDistribution,
  uploadTaskFile,
} from "../controllers/agent task/agentTask.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadTaskFile);
router.get("/get-all-tasks", getTaskDistribution);
router.put("/mark-task-as-completed/:taskId", completeTask);
router.put("/task-delete/:taskId", deleteTask);
router.get("/get-task-by-id/:agentId", getAgentTaskById);

export default router;
