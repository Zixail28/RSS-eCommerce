/// <reference types="vite/client" />

type AuthenticateResponseData = {
  customer: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  };
};

type RegisterResponseData = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
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
        }
      ];
    };
  };
};
