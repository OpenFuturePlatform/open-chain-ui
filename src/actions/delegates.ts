import axios from 'axios';
import { Dispatch } from 'redux';
import { IDelegate, IList } from '../configureStore';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';

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
  const { data } = await axios.get<IGetDelegatesResponse>(`/rpc/delegates`);
  const payload: IList<IDelegate> = data.payload;
  dispatch(new SetDelegates(payload));
};
