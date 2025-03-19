import fs from "fs";
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
 * @route POST /upload
 * @access Private
 */
export const uploadTaskFile = asyncHandler(async (req, res) => {
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

  const assignedTasks = await distributeTasks(records);
  // ✅ Delete file after processing
  const filePath = req?.file?.path;
  // console.log(filePath);
  
  // fs.unlinkSync(filePath);

  // ✅ Send response
  res
    .status(200)
    .json(new ApiResponse(200, assignedTasks, "Tasks uploaded successfully"));
});

/**
 * @desc Get All Tasks (Grouped by Agent)
 * @route GET /get-all-tasks
 * @access Private
 */
export const getTaskDistribution = asyncHandler(async (_, res) => {
  const tasks = await AgentTask.find({})
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
