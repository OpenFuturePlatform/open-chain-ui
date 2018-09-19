export const getNumbersOnly = (value: string) => {
  const result = value.replace(/[^0-9]+/g, '');
  return result;
};
