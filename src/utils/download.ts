export const download = (fileName: string, data: string, mimeType: string = 'text/plain', initBlob?: Blob) => {
  const tempLink = document.createElement('a');
  const blob: Blob = initBlob || new Blob([data], { type: `${mimeType};charset=utf-8,` });
  const href = window.URL.createObjectURL(blob);
  tempLink.setAttribute('href', href);
  tempLink.setAttribute('download', fileName);
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
};
