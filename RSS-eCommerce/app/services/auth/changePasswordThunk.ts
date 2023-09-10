import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";
import { authenticate } from "./authThunk";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

interface Credentials {
  password: string;
  confirmNewPassword: string;
}

export const changePassword = createAsyncThunk<
  PassResponseData,
  Credentials,
  { rejectValue: string }
>("auth/changePassword", async (credentials, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { id, token, version, email } = state.auth;

    const changePasswordRequest = await axios.post(
      `${API_BASE_URL}/${PROJECT_KEY}/customers/password`,
      {
        id: id,
        version: version,
        currentPassword: credentials.password,
        newPassword: credentials.confirmNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const authResponse = await thunkAPI.dispatch(
      authenticate({
        email: email,
        password: credentials.confirmNewPassword,
      }),
    );

    toast.success("Password changed successfully!");

    return { ...changePasswordRequest.data, ...authResponse };
  } catch (e) {
    const error = e as ApiError;

    if (error.response.data.statusCode === 400) {
      toast.error("Invalid current password");
    }

    if (error.response.data.statusCode === 401) {
      toast.error(error.response.data.message);
    }

    const errorMessage = error.response?.data?.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
