import { countries } from '../../data/countries';

export const validateCountry = (country: string) => {
  if (!country) {
    return 'Country is required.';
  }

  const isValidCountry = countries.includes(country.toUpperCase());

  if (!isValidCountry) {
    return 'Invalid country. e.g. DE, UA, EN';
  }

  return true;
};
