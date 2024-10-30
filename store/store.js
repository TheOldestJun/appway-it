import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authSlice";
import { rolesApi } from "./services/roles";
import { usersApi } from "./services/users";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducers,
      [rolesApi.reducerPath]: rolesApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([rolesApi.middleware, usersApi.middleware]),
  });
};