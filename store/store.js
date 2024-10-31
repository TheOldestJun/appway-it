import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authSlice";
import { usersApi } from "./services/users";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducers,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([usersApi.middleware]),
  });
};