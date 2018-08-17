import axios from 'axios';
import { Dispatch } from 'redux';
import { IStoreState, ITransaction, ITransactionCandidate } from '../configureStore';
import { buildTransaction } from '../utils/crypto';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction, IThunkDispatch } from './index';

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

export const createTransaction = (transactionCandidate: ITransactionCandidate) => async (
  dispatch: IThunkDispatch,
  getState: () => IStoreState
) => {
  const state = getState();
  const wallet = state.wallet;

  if (!wallet) {
    throw new Error('>> Wallet not authorized');
  }

  const transaction = buildTransaction(wallet, transactionCandidate);

  await axios.post('/rpc/transactions/transfer', transaction);
  dispatch(getTransactions(wallet.address));
};
