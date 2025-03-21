import AgentTask from "../../models/agentTask.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import {
  distributeTasks,
  parseFile,
  validateTaskFormat,
} from "./service/agentTask.service.js";

/**
 * @desc Upload Agent Tasks
 * @mainRoute /api/v1/agent
 * @route POST /upload
 * @access Private
 */
export const uploadTaskFile = asyncHandler(async (req, res) => {
  const { adminId } = req;

  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const records = await parseFile(req.file);

  if (!validateTaskFormat(records)) {
    throw new ApiError(
      400,
      "Invalid file format. Expected: firstName, phone, notes."
    );
  }

  const assignedTasks = await distributeTasks(records, adminId);

  res
    .status(200)
    .json(new ApiResponse(200, assignedTasks, "Tasks uploaded successfully"));
});

/**
 * @desc Get All Tasks (Grouped by Agent)
 * @route GET /get-all-tasks
 * @access Private
 */
export const getTaskDistribution = asyncHandler(async (req, res) => {
  const {adminId} = req;
  

  const tasks = await AgentTask.find({adminId})
    .populate({
      path: "agentId",
      select: "name email mobile",
    })
    .lean();

  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No Agent Task Found");
  }

  // ✅ Group tasks by agent
  const groupedTasks = tasks.reduce((acc, task) => {
    const agentKey = task.agentId._id.toString(); // Use agent ID as key

    if (!acc[agentKey]) {
      acc[agentKey] = {
        agent: {
          _id: task.agentId._id,
          name: task.agentId.name,
          email: task.agentId.email,
          mobile: task.agentId.mobile,
        },
        tasks: [],
      };
    }

    acc[agentKey].tasks.push({
      _id: task._id,
      firstName: task.firstName,
      phone: task.phone,
      notes: task.notes,
      completed: task.completed,
    });

    return acc;
  }, {});

  // Convert object to array for cleaner JSON response
  const groupedList = Object.values(groupedTasks);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        groupedList,
        "Successfully Fetched Task Distribution"
      )
    );
});

/**
 * @desc Mark Task as Completed
 * @route PUT /mark-task-as-completed/:taskId
 * @access Private
 */
export const completeTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const updatedTask = await AgentTask.findByIdAndUpdate(
    taskId,
    [{ $set: { completed: { $not: "$completed" } } }], // ✅ Atomic toggle
    { new: true }
  );

  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedTask, "Task status updated successfully")
    );
});

/**
 * @desc Delete Task
 * @route DELETE /task-delete/:taskId
 * @access Private
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const deletedTask = await AgentTask.findByIdAndDelete(taskId);

  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
});

/**
 * @desc Get Agent Task by ID
 * @route GET /get-task-by-id/:agentId
 * @access Private
 */
export const getAgentTaskById = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const task = await AgentTask.find({ agentId: agentId })
    .select("-agentId")
    .lean();

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.json(new ApiResponse(200, task, "Task fetched successfully"));
});
