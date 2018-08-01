export const copy2Clipboard = (value: string) => {
  const temp = document.createElement('input');
  document.body.appendChild(temp);
  temp.value = value;
  temp.select();
  const success = document.execCommand('copy');
  document.body.removeChild(temp);
  return success;
};
