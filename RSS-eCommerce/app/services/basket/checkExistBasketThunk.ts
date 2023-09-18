import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { createBasketThunk } from "./createBasketThunk";
import { changeTaxBasketThunk } from "./changeTaxBasketThunk";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const checkExistBasketThunk = createAsyncThunk(
  "basket/checkExist",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { id } = state.auth;
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

      const response = await axios.get(
        `${API_BASE_URL}/${PROJECT_KEY}/carts/customer-id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      await thunkAPI.dispatch(
        changeTaxBasketThunk({
          id: response.data.id,
          version: response.data.version,
        }),
      );
      return {
        ...response.data,
        version: response.data.version + 1,
      };
    } catch (e) {
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
        const basket = (await thunkAPI.dispatch(createBasketThunk())).payload;
        const basketNew = (
          await thunkAPI.dispatch(
            changeTaxBasketThunk({ id: basket.id, version: basket.version }),
          )
        ).payload;
        await axios.post(
          `${API_BASE_URL}/${PROJECT_KEY}/carts/${basketNew.id}`,
          {
            version: basketNew.version,
            actions: [
              {
                action: "setCustomerId",
                customerId: id,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${tokenData.data.access_token}`,
              "Content-Type": "application/json",
            },
          },
        );
        return basketNew;
      } catch {
        const error = e as ApiError;

        const errorMessage =
          error.response?.data?.message ??
          "An error occurred during cart manipulation.";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  },
);
