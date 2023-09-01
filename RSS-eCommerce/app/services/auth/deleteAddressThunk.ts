import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

interface Credentials {
  addressId: string;
}

export const deleteAddress = createAsyncThunk<
  PassResponseData,
  Credentials,
  { rejectValue: string }
>('auth/deleteAddress', async (credentials, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { id, token, version } = state.auth;

    const response = await axios.post(
      `${API_BASE_URL}/${PROJECT_KEY}/customers/${id}`,
      {
        version: version,
        actions: [
          {
            action: 'removeAddress',
            addressId: credentials.addressId,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const getCustomer = await axios.get(
      `${API_BASE_URL}/${PROJECT_KEY}/customers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    toast.success('Address was successfully deleted!');

    return { ...response.data, ...getCustomer.data };
  } catch (e) {
    const error = e as ApiError;

    if (error.response.data.statusCode === 401) {
      toast.error(error.response.data.message);
    }

    const errorMessage = error.response?.data?.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
