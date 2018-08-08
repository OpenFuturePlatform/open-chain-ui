import { IKeys, IWallet } from '../configureStore';

interface ICrypto {
  iv: string;
  data: string;
}

export interface IEncWallet {
  address: string;
  crypto: ICrypto;
}

const stringifyArrayBuffer = (arrayBuffer: ArrayBuffer) => String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));

const encryptText = async (plainText: string, password: string): Promise<ICrypto> => {
  const ptUtf8 = new TextEncoder().encode(plainText);
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

  const iv = crypto.getRandomValues(new Uint8Array(12)) as Uint8Array;
  const alg = { name: 'AES-GCM', iv };
  const key = await crypto.subtle.importKey('raw', pwHash, alg as any, false, ['encrypt']);

  const encBuffer = await crypto.subtle.encrypt(alg, key, ptUtf8);
  const stringBuffer = stringifyArrayBuffer(encBuffer);
  const stringIv = stringifyArrayBuffer(iv as any);

  return { iv: stringIv, data: stringBuffer };
};

const parseArrayBuffer = (data: string) => {
  const ctBuffer = new ArrayBuffer(data.length);
  const bufView = new Uint8Array(ctBuffer);
  for (let i = 0, strLen = data.length; i < strLen; i++) {
    bufView[i] = data.charCodeAt(i);
  }
  return ctBuffer;
};

const decryptText = async (data: string, iv: string, password: string): Promise<string> => {
  const ctBuffer = parseArrayBuffer(data);
  const restoredIv = parseArrayBuffer(iv);

  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

  const alg = { name: 'AES-GCM', iv: restoredIv };
  const key = await crypto.subtle.importKey('raw', pwHash, alg as any, false, ['decrypt']);

  const ptBuffer = await crypto.subtle.decrypt(alg, key, ctBuffer);
  const plaintext = new TextDecoder().decode(ptBuffer);

  return plaintext;
};

export const encryptWallet = async (wallet: IWallet, password: string): Promise<IEncWallet> => {
  const { address, keys } = wallet;
  const keysString = JSON.stringify(keys);
  const crypto = await encryptText(keysString, password);
  return { address, crypto };
};

export const decryptWallet = async (encWallet: IEncWallet, password: string): Promise<IWallet> => {
  const { address, crypto } = encWallet;
  const { data, iv } = crypto;
  try {
    const keysString = await decryptText(data, iv, password);
    const keys: IKeys = JSON.parse(keysString);
    return { address, keys };
  } catch (e) {
    throw e;
  }
};