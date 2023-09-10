export const validateEmail = (email: string | null) => {
  if (!email) {
    return "Email is required.";
  } else if (!email.includes("@")) {
    return 'Email address must contain an "@" symbol.';
  } else if (email.trim() !== email) {
    return "Email address must not contain leading or trailing whitespace.";
  } else if (email.includes(" ")) {
    return "Email address must not contain spaces.";
  } else if (!email.endsWith(".") && !email.includes(".")) {
    return "Email address must contain a valid domain name (e.g., example.com).";
  }

  return true;
};
