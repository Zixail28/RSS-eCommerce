import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
// import { registerSlice } from '../features/auth/registerSlice';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // register: registerSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
