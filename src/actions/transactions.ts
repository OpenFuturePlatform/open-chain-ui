import axios from 'axios';
import { Dispatch } from 'redux';
import { IStoreState, ITransaction, ITransactionCandidate, IWallet } from '../configureStore';
import { buildTransaction } from '../utils/crypto';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction, IThunkDispatch } from './index';

/* tslint:disable */
// const sha256 = require('js-sha256').sha256;
// const BN = require('bn.js');
/* tslint:enable */

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

export const createTransaction = () => async (dispatch: IThunkDispatch, getState: () => IStoreState) => {
  // const state = getState();
  // const wallet: IWallet = state.wallet;

  const wallet: IWallet = {
    address: '0x969eFa1861B3e0C1348D4258a2af7eed5796c807',
    keys: {
      privateKey: '3a80cfc4faab9bbff69326a87ca73c4dd0a4f0b86f9058fe4fc14c035cda2633',
      publicKey: '02be38e216b8b0b3282634ef0e2a2221aaec5f1f2cb847da35c7286d304e103e38'
    }
  };

  const transactionCandidate: ITransactionCandidate = {
    amount: 10,
    fee: 1,
    recipientAddress: '0xf465f33C35CE1216b4DB798653A47D9d854ee6c6'
  };

  if (!wallet) {
    throw new Error('>> Wallet not authorized');
  }

  const transaction = buildTransaction(wallet, transactionCandidate);

  await axios.post('/rpc/transactions/transfer', transaction);
  dispatch(getTransactions(wallet.address));
};
