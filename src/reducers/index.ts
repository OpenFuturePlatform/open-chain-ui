import { combineReducers } from 'redux';
import { EventType } from '../actions/event-types';
import { IState } from '../configureStore';
import { version } from './version';
import { wallet } from './wallet';

export interface IEvent<T> {
  readonly type: EventType;
  readonly payload: T;
}

export const mainReducer = combineReducers({ version, wallet });

export const walletSelector = (state: IState) => state.wallet;
