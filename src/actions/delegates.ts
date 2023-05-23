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
  public readonly type = ActionType.SET_DELEGATES;
  constructor(public readonly payload: IList<IDelegate>) {
    super();
  }
}

export const getDelegates = (): IThunkAction<DelegateAction> => async (dispatch: Dispatch<DelegateAction>) => {
  const page = new Pageable(0);
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/delegates/view`, {params: page});
  const payloads: IList<IDelegate> = data.payload;
  // dispatch(new SetDelegates(payload));
  dispatch({type:ActionType.SET_DELEGATES, payload: payloads });
};

export type AppendToDelegateAction = SetAppendToDelegates;

class SetAppendToDelegates extends ActionCreator implements IAction<IList<IDelegate>> {
  public readonly type = ActionType.SET_APPEND_TO_DELEGATES;
  constructor(public readonly payload: IList<IDelegate>) {
    super();
  }
}

export const appendToDelegates = (): IThunkAction<AppendToDelegateAction> => async (dispatch: Dispatch<AppendToDelegateAction>, getState: () => IStoreState) => {
  const state = getState();
  const page = new Pageable(state.delegates.list.length);
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/delegates/view`, {params: page});
  const payloads: IList<IDelegate> = data.payload;
  //  dispatch(new SetAppendToDelegates(payload));
  dispatch({type:ActionType.SET_APPEND_TO_DELEGATES, payload: payloads });
};