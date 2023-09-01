import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

interface Credentials {
  newCountry: string;
  newPostalCode: string;
  newCity: string;
  newStreetName: string;
  newShippingAddress: boolean;
  newBillingAddress: boolean;
  newDefaultShippingAddress: boolean;
  newDefaultBillingAddress: boolean;
}

const createAxiosInstance = (token: string | null) =>
  axios.create({
    baseURL: `${API_BASE_URL}/${PROJECT_KEY}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const addNewAddress = createAsyncThunk<
  addressResponceData,
  Credentials,
  { rejectValue: string }
>('auth/addNewAddress', async (credentials, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { id, token, version } = state.auth;

    const newAddressResponse = await createAxiosInstance(token).post(
      `/customers/${id}`,
      {
        version: version,
        actions: [
          {
            action: 'addAddress',
            address: {
              postalCode: credentials.newPostalCode,
              city: credentials.newCity,
              country: credentials.newCountry,
              streetName: credentials.newStreetName,
            },
          },
        ],
      }
    );

    let updateAddress = null;

    if (credentials.newShippingAddress || credentials.newBillingAddress) {
      updateAddress = await createAxiosInstance(token).post(
        `/customers/${newAddressResponse.data.id}`,
        {
          version: newAddressResponse.data.version,
          actions: [
            credentials.newShippingAddress
              ? {
                  action: 'addShippingAddressId',
                  addressId:
                    newAddressResponse.data.addresses[
                      newAddressResponse.data.addresses.length - 1
                    ].id,
                }
              : null,

            credentials.newBillingAddress
              ? {
                  action: 'addBillingAddressId',
                  addressId:
                    newAddressResponse.data.addresses[
                      newAddressResponse.data.addresses.length - 1
                    ].id,
                }
              : null,
          ].filter(Boolean),
        }
      );
    }

    let updateDefaultAddress = null;

    if (
      credentials.newDefaultShippingAddress ||
      credentials.newDefaultBillingAddress
    ) {
      updateDefaultAddress = await createAxiosInstance(token).post(
        `/customers/${newAddressResponse.data.id}`,
        {
          version:
            updateAddress?.data.version || newAddressResponse.data.version,
          actions: [
            credentials.newDefaultShippingAddress
              ? {
                  action: 'setDefaultShippingAddress',
                  addressId:
                    newAddressResponse.data.addresses[
                      newAddressResponse.data.addresses.length - 1
                    ].id,
                }
              : null,

            credentials.newDefaultBillingAddress
              ? {
                  action: 'setDefaultBillingAddress',
                  addressId:
                    newAddressResponse.data.addresses[
                      newAddressResponse.data.addresses.length - 1
                    ].id,
                }
              : null,
          ].filter(Boolean),
        }
      );
    }

    toast.success('New address successfully added!');

    return {
      ...newAddressResponse.data,
      ...updateAddress?.data,
      ...updateDefaultAddress?.data,
    };
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
