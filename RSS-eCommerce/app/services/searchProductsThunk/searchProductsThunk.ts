import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearch } from "../../features/searchProductsSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

type searchResponseData = ISearch[];

interface Credentials {
  searchText: string | null;
}

export const searchProducts = createAsyncThunk<
  searchResponseData,
  Credentials,
  { rejectValue: string }
>(
  "products/searchProducts",

  async (credential, thunkAPI) => {
    try {
      const authResponse = await axios.post(
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

      const response = await axios.get(
        `${API_BASE_URL}/${PROJECT_KEY}/product-projections/search?fuzzy=true&limit=6&text.en-US=${credential.searchText}`,
        {
          headers: {
            Authorization: `Bearer ${authResponse.data.access_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.data;
    } catch (e) {
      const error = e as ApiError;

      const errorMessage =
        error.response?.data?.message ??
        "An error occurred while searching Products.";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
