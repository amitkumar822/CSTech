import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import all routes from here
import userRouter from "./src/routes/user.routes.js";
import agentRouter from "./src/routes/agent.routes.js";

// fees all import routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/agents", agentRouter);

app.use(errorHandler);
export { app };
