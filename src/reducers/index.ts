import { combineReducers } from 'redux';
import { IAction } from '../actions/index';
import { IStoreState } from '../configureStore';
import { version } from './version';
import { wallet } from './wallet';

export const mainReducer = combineReducers<IStoreState, IAction<any>>({ version, wallet });

export const walletSelector = (state: IStoreState) => state.wallet;
