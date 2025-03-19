import mongoose from "mongoose";

const AgentTaskSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  notes: {
    type: String,
    required: [true, "Notes are required"],
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Agent ID is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const AgentTask = mongoose.model("AgentTask", AgentTaskSchema);
export default AgentTask;
