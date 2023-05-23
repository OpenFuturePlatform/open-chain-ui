import axios from 'axios';
import { Dispatch } from 'redux';
import {ICastedVotesDelegate} from '../configureStore';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';

interface IGetDelegatesResponse {
  payload: ICastedVotesDelegate | null;
}

export type DelegateAction = SetDelegates;

class SetDelegates extends ActionCreator implements IAction<ICastedVotesDelegate> {
  public readonly type = ActionType.SET_CASTED_VOTES_DELEGATES;
  constructor(public readonly payload: ICastedVotesDelegate) {
    super();
  }
}

export const getCastedVotesDelegates = (address: string): IThunkAction<DelegateAction> => async (dispatch: Dispatch<DelegateAction>) => {
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/accounts/wallets/${address}/delegate`);
  const payloads: ICastedVotesDelegate | null = data.payload;
  //  dispatch(new SetDelegates(payload));
  dispatch({type:ActionType.SET_CASTED_VOTES_DELEGATES, payload: payloads});
};
