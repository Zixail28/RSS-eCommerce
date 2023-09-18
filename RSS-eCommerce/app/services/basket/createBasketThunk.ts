import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const createBasketThunk = createAsyncThunk(
  "basket/create",
  async (credentials, thunkAPI) => {
    try {
      const tokenData = await axios.post(
        `${AUTH_BASE_URL}/oauth/token?grant_type=client_credentials`,
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const response = await axios.post(
        `${API_BASE_URL}/${PROJECT_KEY}/carts`,
        {
          currency: "USD",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
            "Content-Type": "text/plain",
          },
        },
      );

      return {
        ...response.data,
      };
    } catch (e) {
      const error = e as ApiError;

      const errorMessage =
        error.response?.data?.message ??
        "An error occurred during cart manipulation.";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
