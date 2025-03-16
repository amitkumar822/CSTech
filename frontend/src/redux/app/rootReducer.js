import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import { authUserApi } from "../api/authUserApi";

const rootReducer = combineReducers({
  [authUserApi.reducerPath]: authUserApi.reducer,
  auth: authReducer,
});

export default rootReducer;
