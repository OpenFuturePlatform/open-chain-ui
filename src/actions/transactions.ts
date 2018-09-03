import axios, {AxiosResponse} from 'axios';
import { Dispatch } from 'redux';
import {
  IDelegateTransaction,
  IStoreState,
  ITransaction,
  ITransactionCandidate,
  IVoteTransaction
} from '../configureStore';
import {buildDelegateTransaction, buildTransaction, buildVoteTransaction, buildRecallVoteTransaction} from '../utils/crypto';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction, IThunkDispatch } from './index';

interface IGetTransactionsResponse {
  payload: ITransaction[];
}

interface IGetInfoResponse {
  payload: IInfo
}
export interface IInfo {
  host: string,
  port: string
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
  const { data } = await axios.get<IGetTransactionsResponse>(`/rpc/transactions/transfer/address/${address}`);
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

export const createVoteTransaction = ({fee, delegate}: {fee: number, delegate: string}) => async (dispatch: IThunkDispatch, getState: () => IStoreState) => {
  const state = getState();
  const wallet = state.wallet;

  if (!wallet) {
    throw new Error('>> Wallet not authorized');
  }

  const voteTransaction: IVoteTransaction = buildVoteTransaction(wallet, fee, delegate);

  console.log(state)
  await axios.post('/rpc/transactions/vote', voteTransaction);
};

export const createRecallVoteTransaction = ({fee, delegate}: {fee: number, delegate: string}) => async (dispatch: IThunkDispatch, getState: () => IStoreState) => {
  const state = getState();
  const wallet = state.wallet;

  if (!wallet) {
    throw new Error('>> Wallet not authorized');
  }

  const voteTransaction: IVoteTransaction = buildRecallVoteTransaction(wallet, fee, delegate);

  console.log(state)
  await axios.post('/rpc/transactions/vote', voteTransaction);
};

export const createDelegateTransaction = () => async (dispatch: IThunkDispatch, getState: () => IStoreState) => {
  const state = getState();
  const wallet = state.wallet;

  if (!wallet) {
    throw new Error('>> Wallet not authorized');
  }

  const {data}: AxiosResponse<IGetInfoResponse> = await axios.get('/rpc/info');

  const delegateTransaction: IDelegateTransaction = buildDelegateTransaction(wallet, data.payload);

  await axios.post('/rpc/transactions/delegate', delegateTransaction);
};
