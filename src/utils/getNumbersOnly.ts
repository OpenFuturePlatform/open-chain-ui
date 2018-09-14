export const getNumbersOnly = (value: string) => {
  const result = value.replace(/[^0-9]+/g, '');
  if (+result === 0) {
    return '';
  }
  return result;
};
