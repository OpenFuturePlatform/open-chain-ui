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
}

export interface ITransaction {
  readonly fee: number;
  readonly amount: number;
  readonly recipientAddress: string;
  readonly senderPublicKey: string;
  readonly senderAddress: string;
  readonly senderSignature: string;
  readonly timestamp: number;
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
