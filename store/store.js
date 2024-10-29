import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducers,
    },
  });
};