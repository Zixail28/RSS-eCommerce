/// <reference types="vite/client" />

type Address = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

type addressResponceData = {
  defaultBillingAddressId: string | null;
  defaultShippingAddressId: string | null;
  city: string;
  streetName: string;
  postalCode: string;
  country: string;
  addresses: [];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  billingAddressIds: string[] | null;
  shippingAddressIds: string[] | null;
  version: number;
};

type PassResponseData = {
  [x: string]: string | null;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  token: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: [];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
};

type AuthenticateResponseData = {
  access_token: string | null;
  customer: {
    [x: string]: null;
    id: string | null;
    dateOfBirth: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    version: number | null;
  };
};

type RegisterResponseData = {
  billingAddressIds: string[] | null;
  shippingAddressIds: string[] | null;
  defaultBillingAddressId: string | null;
  defaultShippingAddressId: string | null;
  addresses: [];
  customer: any;
  id: string | null;
  dateOfBirth: string | null;
  token: string | null;
  access_token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  version: number | null;
};

type ApiError = {
  response: {
    data: {
      message: string;
      statusCode: number;
      errors: [
        {
          code: number;
          message: string;
          detailedErrorMessage?: string;
        },
      ];
    };
  };
};
