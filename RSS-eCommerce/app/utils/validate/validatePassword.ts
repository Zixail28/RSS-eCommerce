export const validatePassword = (password: string | null) => {
  if (!password) {
    return 'Password is required.';
  } else if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  } else if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  } else if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter (a-z).';
  } else if (!/\d/.test(password)) {
    return 'Password must contain at least one digit (0-9).';
  } else if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character.';
  } else if (password !== password.trim()) {
    return 'Password must not contain leading or trailing whitespace.';
  }

  return true;
};
