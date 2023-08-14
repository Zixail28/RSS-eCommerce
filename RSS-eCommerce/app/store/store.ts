import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
