import { createSlice } from '@reduxjs/toolkit';
import { authenticate } from '../../services/auth/authThunk';
import { RootState } from '../../store/store';

export interface AuthState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isAuth: boolean | null;
}

const initialState: AuthState = {
  email: '',
  firstName: '',
  lastName: '',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      const payload = action.payload.customer;

      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.isAuth = true;
    });
  },
});

export const selectIsAuth = (state: RootState) => state.auth;
export const selectName = (state: RootState) => state.auth.firstName;
