import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

interface Credentials {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  email: string | null;
}

export const changeInfo = createAsyncThunk<
  PassResponseData,
  Credentials,
  { rejectValue: string }
>('auth/changeInfo', async (credentials, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { id, token, version } = state.auth;

    const changeInfoRequest = await axios.post(
      `${API_BASE_URL}/${PROJECT_KEY}/customers/${id}`,
      {
        version: version,
        actions: [
          {
            action: 'setFirstName',
            firstName: credentials.firstName,
          },
          {
            action: 'setLastName',
            lastName: credentials.lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: credentials.dateOfBirth,
          },
          {
            action: 'changeEmail',
            email: credentials.email,
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

    toast.success('Personal information was successfully updated!');

    return { ...changeInfoRequest.data, ...getCustomer.data };
  } catch (e) {
    const error = e as ApiError;

    if (error.response.data.statusCode === 400) {
      toast.error(error.response.data.message);
    }

    if (error.response.data.statusCode === 401) {
      toast.error(error.response.data.message);
    }

    const errorMessage = error.response?.data?.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
