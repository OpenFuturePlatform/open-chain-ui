import axios from 'axios';
import { Dispatch } from 'redux';
import { ITransaction } from '../configureStore';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';

interface IGetTransactionsResponse {
  payload: ITransaction[];
}

export type TransactionAction = SetTransactions;

class SetTransactions extends ActionCreator implements IAction<ITransaction[]> {
  public readonly type = ActionType.SET_TRANSACTIONS;
  constructor(public readonly payload: ITransaction[]) {
    super();
  }
}

export const getTransactions = (address: string): IThunkAction<TransactionAction> => async (
  dispatch: Dispatch<TransactionAction>
) => {
  const { data } = await axios.get<IGetTransactionsResponse>(`/rpc/transactions/transfer/${address}`);
  const payload: ITransaction[] = data.payload;
  dispatch(new SetTransactions(payload));
};
