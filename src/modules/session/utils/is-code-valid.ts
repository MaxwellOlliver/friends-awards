export const isCodeValid = (code: string) => {
  return /^[a-zA-Z0-9]{6}$/.test(code);
};
