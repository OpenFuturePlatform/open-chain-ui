import axios from 'axios';
import { Dispatch } from 'redux';
import {IDelegate, IList, IStoreState} from '../configureStore';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';
import Pageable from "../common/pageable";

interface IGetDelegatesResponse {
  payload: IList<IDelegate>;
}

export type DelegateAction = SetDelegates;

class SetDelegates extends ActionCreator implements IAction<IList<IDelegate>> {
  public readonly type = ActionType.SET_CASTED_VOTES_DELEGATES;
  constructor(public readonly payload: IList<IDelegate>) {
    super();
  }
}

export const getCastedVotesDelegates = (address: string): IThunkAction<DelegateAction> => async (dispatch: Dispatch<DelegateAction>) => {
  const page = new Pageable(0);
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/accounts/wallets/${address}/delegates`, {params: page});
  const payload: IList<IDelegate> = data.payload;
  dispatch(new SetDelegates(payload));
};

export type AppendToDelegateAction = SetAppendToDelegates;

class SetAppendToDelegates extends ActionCreator implements IAction<IList<IDelegate>> {
  public readonly type = ActionType.SET_APPEND_TO_CASTED_VOTES_DELEGATES;
  constructor(public readonly payload: IList<IDelegate>) {
    super();
  }
}

export const appendToCastedVotesDelegates = (address: string): IThunkAction<AppendToDelegateAction> => async (dispatch: Dispatch<AppendToDelegateAction>, getState: () => IStoreState) => {
  const state = getState();
  const page = new Pageable(state.delegates.list.length);
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/accounts/wallets/${address}/delegates`, {params: page});
  const payload: IList<IDelegate> = data.payload;
  dispatch(new SetAppendToDelegates(payload));
};