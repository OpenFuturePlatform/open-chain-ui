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

export interface IStoreState {
  readonly version: string;
  readonly seed: string;
  readonly wallet: IWallet | null;
}

const initState = {};

export const configureStore = () =>
  createStore<IStoreState, IAction, object, object>(
    mainReducer,
    initState,
    applyMiddleware(reduxThunk as ThunkMiddleware<IStoreState>)
  );
