export const validateName = (name: string | null) => {
  if (!name) {
    return 'Name is required.';
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    return 'Name must contain only letters (A-Z, a-z).';
  } else if (name.trim() !== name) {
    return 'Name must not contain leading or trailing whitespace.';
  } else if (name.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  return true;
};
