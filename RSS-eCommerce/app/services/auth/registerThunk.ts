import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingCountry: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingStreet: string;
  billingCountry: string;
  billingPostalCode: string;
  billingCity: string;
  billingStreet: string;
  useDefaultAddress: boolean;
}

const createAxiosInstance = (token: string) =>
  axios.create({
    baseURL: `${API_BASE_URL}/${PROJECT_KEY}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const register = createAsyncThunk<
  RegisterResponseData,
  Credentials,
  { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const token = authResponse.data.access_token;

    const customerData = await createAxiosInstance(token).post('/customers', {
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      password: credentials.password,
    });

    const updateCustomerAddress = await createAxiosInstance(token).post(
      `/customers/${customerData.data.customer.id}`,
      {
        version: customerData.data.customer.version,
        actions: [
          {
            action: 'setDateOfBirth',
            dateOfBirth: credentials.dateOfBirth,
          },
          {
            action: 'addAddress',
            address: {
              streetName: credentials.shippingStreet,
              postalCode: credentials.shippingPostalCode,
              city: credentials.shippingCity,
              country: credentials.shippingCountry,
            },
          },
          {
            action: 'addAddress',
            address: {
              streetName: credentials.billingStreet,
              postalCode: credentials.billingPostalCode,
              city: credentials.billingCity,
              country: credentials.billingCountry,
            },
          },
        ],
      }
    );

    const setAddresses = await createAxiosInstance(token).post(
      `/customers/${customerData.data.customer.id}`,
      {
        version: updateCustomerAddress.data.version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId: updateCustomerAddress.data.addresses[0].id,
          },
          {
            action: 'addBillingAddressId',
            addressId: updateCustomerAddress.data.addresses[1].id,
          },
        ],
      }
    );

    if (credentials.useDefaultAddress) {
      await createAxiosInstance(token).post(
        `/customers/${customerData.data.customer.id}`,
        {
          version: setAddresses.data.version,
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId: updateCustomerAddress.data.addresses[0].id,
            },
          ],
        }
      );
    }

    const response = await createAxiosInstance(token).get(
      `/customers/${customerData.data.customer.id}`
    );

    return response.data;
  } catch (e) {
    const error = e as ApiError;

    if (error.response.data.statusCode === 400) {
      toast.error(error.response.data.message);
    }

    if (error.response.data.errors) {
      toast.error(error.response.data.errors[0].detailedErrorMessage);
    }

    const errorMessage =
      error.response?.data?.message ?? 'An error occurred during registration.';

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
