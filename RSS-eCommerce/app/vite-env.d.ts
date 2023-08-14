/// <reference types="vite/client" />

type AuthenticateResponseData = {
  customer: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  };
};
