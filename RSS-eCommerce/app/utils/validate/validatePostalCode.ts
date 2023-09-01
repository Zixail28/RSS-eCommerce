export const validatePostalCode = (countryCode: string, postalCode: string) => {
  const postalCodeRegexMap: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
  };

  if (!postalCodeRegexMap[countryCode]) {
    const digitsOnlyRegex = /^\d+$/;
    if (!digitsOnlyRegex.test(postalCode)) {
      return 'Postal code must contain only numbers';
    }
    return true;
  }

  const regex = postalCodeRegexMap[countryCode];

  if (!regex.test(postalCode)) {
    if (countryCode === 'US') {
      return 'Invalid zip code format. Example: 12345 или 12345-6789';
    }
    if (countryCode === 'CA') {
      return 'Invalid zip code format. Example: A1B 2C3';
    }
  }

  return true;
};
