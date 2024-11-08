import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authSlice";
import currentOrderReducers from "./reducers/currentOrderSlice";
import { usersApi } from "./services/users";
import { unitsApi } from "./services/units";
import { productsApi } from "./services/products";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducers,
      currentOrder: currentOrderReducers,
      [usersApi.reducerPath]: usersApi.reducer,
      [unitsApi.reducerPath]: unitsApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([usersApi.middleware, unitsApi.middleware, productsApi.middleware]),
  });
};