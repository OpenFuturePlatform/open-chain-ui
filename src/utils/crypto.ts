import {
  IDelegateCandidate,
  IDelegateTransaction,
  IKeys,
  ITransaction,
  ITransactionCandidate,
  IUnsignedTransaction, IVoteCandidate, IVoteTransaction,
  IWallet
} from '../configureStore';
import { DELEGATE_AMOUNT, DELEGATE_FEE } from '../const/transactions';
/* tslint:disable */
const sha256 = require('js-sha256').sha256;
const EC = require('elliptic').ec;
const BN = require('bn.js');
/* tslint:enable */

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

const toByteArray = (data: string | number): number[] => {
  if (typeof data === 'number') {
    return new BN(data).toArray(8, 8);
  }
  return data.split('').map(char => char.charCodeAt(0));
};

const to4Array = (data: number): number[] => {
    return new BN(data).toArray(8, 4);
};

const hashTransaction = (unsignedTransaction: IUnsignedTransaction): string => {
  const { timestamp, fee, senderAddress, amount, recipientAddress } = unsignedTransaction;
  const byteArray = [
    ...toByteArray(timestamp),
    ...toByteArray(fee),
    ...toByteArray(senderAddress),
    ...toByteArray(amount),
    ...toByteArray(recipientAddress)
  ];
  return sha256(sha256.array(byteArray));
};

export const buildTransaction = (wallet: IWallet, transactionCandidate: ITransactionCandidate): ITransaction => {
  const { address: senderAddress, keys } = wallet;
  const { publicKey: senderPublicKey, privateKey } = keys;
  const timestamp = Date.now();

  const unsignedTransaction: IUnsignedTransaction = {
    ...transactionCandidate,
    senderAddress,
    senderPublicKey,
    timestamp
  };
  const hash = hashTransaction(unsignedTransaction);
  const senderSignature = signByPrivateKey(hash, privateKey);
  return { senderSignature, ...unsignedTransaction, hash };
};

export const getDelegateKey = (wallet: IWallet) => sha256(wallet.keys.publicKey);

const hashDelegateTransaction = (unsignedTransaction: IDelegateCandidate): string => {
  const { timestamp, fee, senderAddress, amount, nodeId } = unsignedTransaction;
  const byteArray = [
    ...toByteArray(timestamp),
    ...toByteArray(fee),
    ...toByteArray(senderAddress),
    ...toByteArray(nodeId),
    ...toByteArray(amount)
  ];
  return sha256(sha256.array(byteArray));
};

export const buildDelegateTransaction = (wallet: IWallet): IDelegateTransaction => {
  const { address: senderAddress, keys } = wallet;
  const { publicKey: senderPublicKey, privateKey } = keys;
  const nodeId = getDelegateKey(wallet);
  const timestamp = Date.now();

  const unsignedTransaction: IDelegateCandidate = {
    amount: DELEGATE_AMOUNT,
    fee: DELEGATE_FEE,
    nodeId,
    senderAddress,
    senderPublicKey,
    timestamp
  };

  const hash = hashDelegateTransaction(unsignedTransaction);
  const senderSignature = signByPrivateKey(hash, privateKey);
  return { senderSignature, ...unsignedTransaction, hash };
};

const hashVoteTransaction = (unsignedTransaction: IVoteCandidate): string => {
  const { timestamp, fee, senderAddress, voteTypeId, nodeId } = unsignedTransaction;
  const byteArray = [
    ...toByteArray(timestamp),
    ...toByteArray(fee),
    ...toByteArray(senderAddress),
    ...to4Array(voteTypeId),
    ...toByteArray(nodeId)
  ];
  console.log(byteArray, voteTypeId)
  return sha256(sha256.array(byteArray));
};

export const buildVoteTransaction = (wallet: IWallet, fee: number, nodeId: string): IVoteTransaction => {
  const { address: senderAddress, keys } = wallet;
  const { publicKey: senderPublicKey, privateKey } = keys;
  const timestamp = Date.now();

  const unsignedTransaction: IVoteCandidate = {
    fee,
    nodeId,
    senderAddress,
    senderPublicKey,
    timestamp,
    voteTypeId: 1
  };

  const hash = hashVoteTransaction(unsignedTransaction);
  const senderSignature = signByPrivateKey(hash, privateKey);
  return { senderSignature, ...unsignedTransaction, hash };
};

export const buildRecallVoteTransaction = (wallet: IWallet, fee: number, nodeId: string): IVoteTransaction => {
  const { address: senderAddress, keys } = wallet;
  const { publicKey: senderPublicKey, privateKey } = keys;
  const timestamp = Date.now();

  const unsignedTransaction: IVoteCandidate = {
    fee,
    nodeId,
    senderAddress,
    senderPublicKey,
    timestamp,
    voteTypeId: 2
  };

  const hash = hashVoteTransaction(unsignedTransaction);
  const senderSignature = signByPrivateKey(hash, privateKey);
  return { senderSignature, ...unsignedTransaction, hash };
};

export const signByPrivateKey = (message: string, privateKey: string) => {
  const ec = new EC('secp256k1');
  const keyPair = ec.keyFromPrivate(privateKey, 'hex');
  const signature = keyPair.sign(message);
  const derSign = signature.toDER();
  return btoa(derSign.map((it: any) => String.fromCharCode(it)).join(''));
};
