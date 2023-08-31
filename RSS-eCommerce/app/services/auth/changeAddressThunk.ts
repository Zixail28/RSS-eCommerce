import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

interface Credentials {
  addressId: string | null;
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
  defaultShippingAddressId: boolean;
  defaultBillingAddressId: boolean;
}

export const changeAddress = createAsyncThunk<
  PassResponseData,
  Credentials,
  { rejectValue: string }
>('auth/changeAddress', async (credentials, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { id, token, version } = state.auth;

    const changeAddressRequest = await axios.post(
      `${API_BASE_URL}/${PROJECT_KEY}/customers/${id}`,
      {
        version: version,
        actions: [
          {
            action: 'changeAddress',
            addressId: credentials.addressId,
            address: {
              country: credentials.country,
              postalCode: credentials.postalCode,
              city: credentials.city,
              streetName: credentials.streetName,
            },
          },

          credentials.defaultShippingAddressId
            ? {
                action: 'setDefaultShippingAddress',
                addressId: credentials.addressId,
              }
            : {
                action: 'removeShippingAddressId',
                addressId: credentials.addressId,
              },
          {
            action: 'addShippingAddressId',
            addressId: credentials.addressId,
          },

          credentials.defaultBillingAddressId
            ? {
                action: 'setDefaultBillingAddress',
                addressId: credentials.addressId,
              }
            : {
                action: 'removeBillingAddressId',
                addressId: credentials.addressId,
              },
          {
            action: 'addBillingAddressId',
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

    toast.success('The address data has been updated successfully!');

    return { ...changeAddressRequest.data, ...getCustomer.data };
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
