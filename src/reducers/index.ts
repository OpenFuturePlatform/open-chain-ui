import { combineReducers } from 'redux';
import { IAction } from '../actions/index';
import { IStoreState } from '../configureStore';
import { balance } from './balance';
import { delegates } from './delegates';
import { castedVotesDelegates } from './castedVotesdelegates';
import { seed } from './seed';
import { transactions } from './transactions';
import { version } from './version';
import { wallet } from './wallet';

export const mainReducer = combineReducers<IStoreState, IAction<any>>({
  balance,
  delegates,
  castedVotesDelegates,
  seed,
  transactions,
  version,
  wallet
});

export const walletSelector = (state: IStoreState) => state.wallet;
