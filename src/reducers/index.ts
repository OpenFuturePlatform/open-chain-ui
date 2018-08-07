import { combineReducers } from 'redux';
import { IAction } from '../actions/index';
import { IStoreState } from '../configureStore';
import { balance } from './balance';
import { delegates } from './delegates';
import { seed } from './seed';
import { version } from './version';
import { wallet } from './wallet';

export const mainReducer = combineReducers<IStoreState, IAction<any>>({ version, seed, wallet, balance, delegates });

export const walletSelector = (state: IStoreState) => state.wallet;
