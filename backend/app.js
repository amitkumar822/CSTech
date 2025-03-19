import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();
// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// body parser middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
app.use(express.static("public"));

// import all routes from here
import userRouter from "./src/routes/user.routes.js";
import agentTaskRouter from "./src/routes/agentTask.routes.js";

// fees all import routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/agent", agentTaskRouter);

app.use(errorHandler);
export { app };
