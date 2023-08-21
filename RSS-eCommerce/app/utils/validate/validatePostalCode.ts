export const validatePostalCode = (countryCode: string, postalCode: string) => {
  const postalCodeRegexMap: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
  };

  if (!postalCodeRegexMap[countryCode]) {
    return true;
  }

  const regex = postalCodeRegexMap[countryCode];
  return regex.test(postalCode);
};
