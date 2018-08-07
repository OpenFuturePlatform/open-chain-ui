import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';

interface IGetBalanceResponse {
  payload: number;
}

export type BalanceAction = SetBalance | CleanBalance;

class SetBalance extends ActionCreator implements IAction<string> {
  public readonly type = ActionType.SET_BALANCE;
  constructor(public readonly payload: string) {
    super();
  }
}

export class CleanBalance extends ActionCreator implements IAction<string> {
  public readonly type = ActionType.CLEAN_BALANCE;
  public readonly payload = '';
}

export const getBalance = (address: string): IThunkAction<BalanceAction> => async (
  dispatch: Dispatch<BalanceAction>
) => {
  const { data } = await axios.get<IGetBalanceResponse>(`/rpc/accounts/wallets/${address}/balance`);
  const payload: string = data.payload.toFixed(8);
  dispatch(new SetBalance(payload));
};
