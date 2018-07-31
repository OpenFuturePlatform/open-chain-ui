import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStoreState } from '../configureStore';
import { ActionType } from './actionType';

export interface IAction<T = any> extends Action {
  readonly type: ActionType;
  readonly payload: T;
}

export type IThunkDispatch = ThunkDispatch<IStoreState, undefined, IAction<any>>;

export type IThunkAction<A extends IAction, R = Promise<void>> = ThunkAction<R, IStoreState, undefined, A>;

export const ActionCreator = Object;
