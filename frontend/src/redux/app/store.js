import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authUserApi } from "../api/authUserApi";
import { agentTaskApi } from "../api/agentTaskApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authUserApi.middleware,
      agentTaskApi.middleware
    ),
});
