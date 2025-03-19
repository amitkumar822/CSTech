import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import { authUserApi } from "../api/authUserApi";
import { agentTaskApi } from "../api/agentTaskApi";

const rootReducer = combineReducers({
  [authUserApi.reducerPath]: authUserApi.reducer,
  [agentTaskApi.reducerPath]: agentTaskApi.reducer,
  auth: authReducer,
});

export default rootReducer;
