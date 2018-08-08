import { IEncWallet } from './crypto';

export const readJsonFile = (file: File): Promise<IEncWallet> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const encWallet: IEncWallet = JSON.parse(reader.result);
        resolve(encWallet);
      } catch (e) {
        reject(e);
      }
    };
    try {
      reader.readAsText(file);
    } catch (e) {
      reject(e);
    }
  });
