import { parseISO, differenceInYears } from "date-fns";

export const validateDateOfBirth = (dateOfBirth: string | null) => {
  if (!dateOfBirth) {
    return "Date of birth is required.";
  }

  const userDate = parseISO(dateOfBirth);

  if (!userDate || isNaN(userDate.getTime())) {
    return "Invalid date format.";
  }

  const currentDate = new Date();
  const age = differenceInYears(currentDate, userDate);

  if (age < 18) {
    return "You must be at least 18 years old.";
  }

  return true;
};
