import { configureStore } from '@reduxjs/toolkit';
import authReducers from './reducers/authSlice';
import currentOrderReducers from './reducers/currentOrderSlice';
import { usersApi } from './services/users';
import { unitsApi } from './services/units';
import { productsApi } from './services/products';
import { ordersApi } from './services/orders';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducers,
    currentOrder: currentOrderReducers,
    [usersApi.reducerPath]: usersApi.reducer,
    [unitsApi.reducerPath]: unitsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      unitsApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
    ]),
});
setupListeners(store.dispatch);
