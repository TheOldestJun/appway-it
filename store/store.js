import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authSlice";
import { usersApi } from "./services/users";
import { unitsApi } from "./services/units";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducers,
      [usersApi.reducerPath]: usersApi.reducer,
      [unitsApi.reducerPath]: unitsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([usersApi.middleware, unitsApi.middleware]),
  });
};