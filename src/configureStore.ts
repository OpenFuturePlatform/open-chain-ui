import { applyMiddleware, createStore } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { IAction } from './actions/index';
import { mainReducer } from './reducers';

export interface IKeys {
  readonly publicKey: string;
  readonly privateKey: string;
}

export interface IWallet {
  readonly keys: IKeys;
  readonly address: string;
}

export interface IDelegate {
  readonly publicKey: string;
  readonly address: string;
  readonly id: number;
  readonly votes: number;
  readonly rank: number;
}

export interface ITransactionCandidate {
  readonly fee: number;
  readonly amount: number;
  readonly recipientAddress: string;
}

export interface IUnsignedTransaction extends ITransactionCandidate {
  readonly senderPublicKey: string;
  readonly senderAddress: string;
  readonly timestamp: number;
}

export interface ITransaction extends IUnsignedTransaction {
  readonly senderSignature: string;
  readonly hash: string;
}

export interface IList<T> {
  readonly list: T[];
  readonly totalCount: number;
}

export interface IStoreState {
  readonly version: string;
  readonly seed: string;
  readonly wallet: IWallet | null;
  readonly balance: string;
  readonly delegates: IList<IDelegate>;
  readonly transactions: ITransaction[];
}

const initState = {};

export const configureStore = () =>
  createStore<IStoreState, IAction, object, object>(
    mainReducer,
    initState,
    applyMiddleware(reduxThunk as ThunkMiddleware<IStoreState>)
  );
