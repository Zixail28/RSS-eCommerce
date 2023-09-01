import { createSlice } from '@reduxjs/toolkit';
import { authenticate } from '../../services/auth/authThunk';
import { RootState } from '../../store/store';
import { register } from '../../services/auth/registerThunk';
import { changePassword } from '../../services/auth/changePasswordThunk';
import { changeInfo } from '../../services/auth/changeInfoThunk';
import { deleteAddress } from '../../services/auth/deleteAddressThunk';
import { changeAddress } from '../../services/auth/changeAddressThunk';
import { addNewAddress } from '../../services/auth/addNewAddressThunk';

export interface AuthState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  addresses: Address[] | null;
  defaultShippingAddressId: string | null;
  defaultBillingAddressId: string | null;
  shippingAddressIds: string[] | null;
  billingAddressIds: string[] | null;
  isAuth: boolean | null;
  id: string | null;
  token: string | null;
  version: number | null;
}

const initialState: AuthState = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  defaultShippingAddressId: '',
  defaultBillingAddressId: '',
  shippingAddressIds: [],
  billingAddressIds: [],
  isAuth: false,
  id: '',
  token: '',
  version: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      const payload = action.payload;

      state.email = payload.customer.email;
      state.firstName = payload.customer.firstName;
      state.lastName = payload.customer.lastName;
      state.dateOfBirth = payload.customer.dateOfBirth;
      state.addresses = payload.customer.addresses;
      state.defaultShippingAddressId =
        payload.customer.defaultShippingAddressId || '';
      state.defaultBillingAddressId =
        payload.customer.defaultBillingAddressId || '';
      state.shippingAddressIds = payload.customer.shippingAddressIds;
      state.billingAddressIds = payload.customer.billingAddressIds;
      state.isAuth = true;
      state.id = payload.customer.id;
      state.token = payload.access_token;
      state.version = payload.customer.version;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      const payload = action.payload;

      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.dateOfBirth = payload.dateOfBirth;
      state.addresses = payload.addresses;
      state.defaultShippingAddressId = payload.defaultShippingAddressId || '';
      state.defaultBillingAddressId = payload.defaultBillingAddressId || '';
      state.shippingAddressIds = payload.shippingAddressIds;
      state.billingAddressIds = payload.billingAddressIds;
      state.isAuth = true;
      state.id = payload.id;
      state.token = payload.token;
      state.version = payload.version;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      const payload = action.payload;

      state.version = payload.version;
    });

    builder.addCase(changeInfo.fulfilled, (state, action) => {
      const payload = action.payload;

      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.dateOfBirth = payload.dateOfBirth;
      state.version = payload.version;
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      const payload = action.payload;

      state.addresses = payload.addresses;
      state.defaultShippingAddressId = payload.defaultShippingAddressId || '';
      state.defaultBillingAddressId = payload.defaultBillingAddressId || '';
      state.shippingAddressIds = payload.shippingAddressIds;
      state.billingAddressIds = payload.billingAddressIds;
      state.version = payload.version;
    });

    builder.addCase(changeAddress.fulfilled, (state, action) => {
      const payload = action.payload;

      state.addresses = payload.addresses;
      state.defaultShippingAddressId = payload.defaultShippingAddressId || '';
      state.defaultBillingAddressId = payload.defaultBillingAddressId || '';
      state.shippingAddressIds = payload.shippingAddressIds;
      state.billingAddressIds = payload.billingAddressIds;
      state.version = payload.version;
    });

    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      const payload = action.payload;

      state.addresses = payload.addresses;
      state.defaultShippingAddressId = payload.defaultShippingAddressId || '';
      state.defaultBillingAddressId = payload.defaultBillingAddressId || '';
      state.shippingAddressIds = payload.shippingAddressIds;
      state.billingAddressIds = payload.billingAddressIds;
      state.version = payload.version;
    });
  },
});

export const { clearAuthState } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth;
export const selectName = (state: RootState) => state.auth.firstName;
