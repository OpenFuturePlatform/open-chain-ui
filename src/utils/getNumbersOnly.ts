export const getNumbersOnly = (value: string) => {
  const result = value.replace(/[^0-9.]+/g, '');
  if (result.split('').filter(it => it === '.').length > 1) {
    return result.replace(/[.]/, '');
  }
  return result;
};
