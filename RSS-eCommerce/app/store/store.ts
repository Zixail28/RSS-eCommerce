import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { categorySlice } from "../features/categorySlice";
import { productsSlice } from "../features/productsSlice";
// import { registerSlice } from '../features/auth/registerSlice';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    products: productsSlice.reducer,
    // register: registerSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
