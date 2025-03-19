import { User } from "../../../models/user.model.js";
import fs from "fs";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import AgentTask from "../../../models/agentTask.model.js";

// ✅ Parse CSV/XLSX file
export const parseFile = async (file) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const filePath = file.path;
    console.log(filePath);
    

    if (file.mimetype === "text/csv") {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          records.push(normalizeKeys(row)); // 🔹 Convert keys to lowercase
        })
        .on("end", () => {
          fs.unlinkSync(filePath); // ✅ Delete file after processing
          resolve(records);
        })
        .on("error", reject);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetData = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );
      fs.unlinkSync(filePath); // ✅ Delete file after processing
      resolve(sheetData.map(normalizeKeys)); // 🔹 Convert keys to lowercase
    }
  });
};

// ✅ Normalize object keys to lowercase
export const normalizeKeys = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.trim().toLowerCase()] = obj[key];
    return acc;
  }, {});
};

// ✅ Validate CSV/XLSX Format
export const validateTaskFormat = (records) => {    
  return (
    records.length > 0 &&
    records.every((row) =>
      ["firstname", "phone", "notes"].every((key) => row[key])
    )
  );
};

// ✅ Distribute Tasks Among Agents
export const distributeTasks = async (records) => {
  const agents = await User.find({ role: "agent" }).select("_id");

  if (agents.length < 5) {
    throw new ApiError(
      400,
      "At least 5 agents required for task distribution."
    );
  }

  const assignedTasks = records.map((record, index) => ({
    firstName: record.firstname,
    phone: record.phone,
    notes: record.notes,
    agentId: agents[index % agents.length]._id, // ✅ Distribute evenly
  }));

  // ✅ Save tasks to MongoDB
  const savedTasks = await AgentTask.insertMany(assignedTasks);

  return savedTasks; // ✅ Return saved records
};
