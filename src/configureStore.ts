import { applyMiddleware, createStore } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { IAction } from './actions/index';
import { mainReducer } from './reducers';

export interface IKeys {
  publicKey: string;
  privateKey: string;
}

export interface IWallet {
  keys: IKeys;
  address: string;
}

export interface IStoreState {
  readonly version: string;
  readonly wallet: IWallet | null;
}

const initState = { wallet: null };

export const configureStore = () =>
  createStore<IStoreState, IAction, object, object>(
    mainReducer,
    initState,
    applyMiddleware(reduxThunk as ThunkMiddleware<IStoreState>)
  );
