import { countries } from '../../data/countries';

export const validateCountry = (country: string) => {
  if (!country) {
    return 'Country is required.';
  }

  const isValidCountry = countries.includes(country.toUpperCase());

  if (!isValidCountry) {
    return 'Invalid country. (example: DE, UA, BY)';
  }

  return true;
};
