import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { mainReducer } from './reducers';

export interface IKeys {
  publicKey: string;
  privateKey: string;
}

export interface IWallet {
  keys: IKeys;
  address: string;
}

export interface IState {
  readonly version: string;
  readonly wallet: IWallet | null;
}

const initState = { wallet: null };

export const configureStore = () =>
  createStore<IState, any, any, any>(mainReducer, initState, applyMiddleware(reduxThunk));
