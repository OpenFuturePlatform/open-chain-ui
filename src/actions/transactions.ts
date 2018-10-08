import axios, {AxiosResponse} from 'axios';
import { Dispatch } from 'redux';
import {
  IDelegate,
  IDelegateTransaction, IList,
  IStoreState,
  ITransaction,
  ITransactionCandidate,
  IVoteTransaction
} from '../configureStore';
import {buildDelegateTransaction, buildTransaction, buildVoteTransaction, buildRecallVoteTransaction} from '../utils/crypto';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction, IThunkDispatch } from './index';
import Pageable from "../common/pageable";

interface IGetTransactionsResponse {
  payload: IList<ITransaction>;
}

interface IGetInfoResponse {
  payload: IInfo
}
export interface IInfo {
  host: string
  port: string
  publicKey: string
  nodeId: string
}

export type TransactionAction = SetTransactions;

class SetTransactions extends ActionCreator implements IAction<IList<ITransaction>> {
  public readonly type = ActionType.SET_TRANSACTIONS;
  constructor(public readonly payload: IList<ITransaction>) {
    super();
  }
}

export const getTransactions = (address: string): IThunkAction<TransactionAction> => async (
  dispatch: Dispatch<TransactionAction>
) => {
  const page = new Pageable(0);
  const { data } = await axios.get<IGetTransactionsResponse>(`/rpc/transactions/transfer/address/${address}`, {params: {...page, sortField: 'timestamp'}});
  const payload: IList<ITransaction> = data.payload;
  dispatch(new SetTransactions(payload));
};

export type AppendToTransactionsAction = SetAppendToTransactions;

class SetAppendToTransactions extends ActionCreator implements IAction<IList<ITransaction>> {
  public readonly type = ActionType.SET_APPEND_TO_TRANSACTIONS;
  constructor(public readonly payload: IList<ITransaction>) {
    super();
  }
}

export const appendToTransactions = (address: string): IThunkAction<AppendToTransactionsAction> => async (
  dispatch: Dispatch<AppendToTransactionsAction>, getState: () => IStoreState
) => {
  const state = getState();
  const page = new Pageable(state.transactions.list.length);
  const { data } = await axios.get<IGetTransactionsResponse>(`/rpc/transactions/transfer/address/${address}`, {params: {...page, sortField: 'timestamp'}});
  const payload: IList<ITransaction> = data.payload;
  dispatch(new SetAppendToTransactions(payload));
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
