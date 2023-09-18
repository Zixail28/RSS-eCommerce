import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

type productIdType = string;

interface ResponseCart {
  id: string;
  lineItems: string[];
  version: number;
}

export const removeProductInBasketThunk = createAsyncThunk<
  ResponseCart,
  productIdType
>("basket/removeProduct", async (lineItemId, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { id, version } = state.basket.cart;

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
      `${API_BASE_URL}/${PROJECT_KEY}/carts/${id}`,
      {
        version: version,
        actions: [
          {
            action: "removeLineItem",
            lineItemId: lineItemId,
          },
        ],
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
});
