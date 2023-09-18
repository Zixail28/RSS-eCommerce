import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createBasketThunk } from "../basket/createBasketThunk";
import { changeTaxBasketThunk } from "../basket/changeTaxBasketThunk";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

interface Credentials {
  email: string | null;
  password: string;
}

export const authenticate = createAsyncThunk<
  AuthenticateResponseData,
  Credentials,
  { rejectValue: string }
>("auth/authenticate", async (credentials, thunkAPI) => {
  try {
    const tokenData = await axios.post(
      `${AUTH_BASE_URL}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${credentials.email}&password=${credentials.password}`,
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
    const basket = (await thunkAPI.dispatch(createBasketThunk())).payload;
    await thunkAPI.dispatch(
      changeTaxBasketThunk({ id: basket.id, version: basket.version }),
    );
    const response = await axios.post(
      `${API_BASE_URL}/${PROJECT_KEY}/me/login`,
      {
        email: credentials.email,
        password: credentials.password,
        anonymousCart: {
          id: basket.id,
          typeId: "cart",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return {
      ...response.data,
      ...tokenData.data,
    };
  } catch (e) {
    const error = e as ApiError;

    if (error.response.data.statusCode === 400) {
      toast.error("email or password is incorrect");
    }

    const errorMessage =
      error.response?.data?.message ??
      "An error occurred during authentication.";

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
