import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";
import { Agent } from "../models/agent.model.js";

/**
 * @desc Register a new Agent
 * @mainRoute /api/v1/agents
 * @route POST /register
 * @access Public
 */
export const registerAgent = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  const existingAgent = await Agent.findOne({ email }).lean();
  if (existingAgent) {
    throw new ApiError(400, "Agent already exists");
  }

  const agent = new Agent({
    name,
    email,
    mobile,
    password,
    role,
  });

  // Save Agent to database
  await agent.save();

  res
    .status(201)
    .json(new ApiResponse(201, [], "Agent registered successfully"));
});

/**
 * @desc Agent Login
 * @route POST /login
 * @access Public
 */
export const loginAgent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email }).select("+password");
  if (!agent) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatch = await agent.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT Token
  const token = await createTokensAndSaveCookies(agent._id, res);
  console.log(token);
  

  // Convert to plain object and remove password
  const AgentWithoutPassword = agent.toObject();
  delete AgentWithoutPassword.password;
  delete AgentWithoutPassword.refreshToken;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { agent: AgentWithoutPassword, token },
        "Agent Login Successfully"
      )
    );
});

/**
 * @desc Agent Logout
 * @route POST /logout
 * @access Public
 */
export const logOut = asyncHandler(async (req, res) => {
  //   const { agentId } = req.Agent;

  //   // Remove refresh token from database
  //   await Agent.findByIdAndUpdate(
  //     agentId,
  //     { $set: { refreshToken: "", token: "" } },
  //     { new: true }
  //   );

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Agent Logged Out Successfully"));
});

/**
 * @desc Update Agent Profile
 * @route PUT update/:AgentId
 * @access Private (Agent/Admin)
 */
export const updateAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;
  const updatedAgent = await Agent.findByIdAndUpdate(agentId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedAgent) {
    throw new ApiError(404, "Agent not found");
  }

  res.json(
    new ApiResponse(200, updatedAgent, "Agent profile updated successfully")
  );
});
