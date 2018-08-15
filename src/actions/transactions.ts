import axios from 'axios';
import { Dispatch } from 'redux';
import { ITransaction } from '../configureStore';
import { signByPrivateKey } from '../utils/crypto';
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

export const createTransaction = () => async (dispatch: Dispatch<TransactionAction>) => {
  const senderPublicKey = '03dfa4bce7d0f0da39a5de3c0f43f633c1334aee6277f3b2efb0c0e1413a2d99e5';
  const senderPrivateKey = '37df6f074afca0e5daad7ffdcf711451bc68d810fd2ff6cc96f85f9b0683102c';
  // const transactionData = {
  //   amount: 1000,
  //   fee: 20,
  //   recipientAddress: '0x969c7a534f00869D12Cd74E602f6eBcF13AC46De',
  //   senderAddress: '0xA950383F788Fd6e3Ca208ce80f6501d905aBc042'
  // };

  const sign = signByPrivateKey('hello1', senderPrivateKey);

  const respose = await axios.post('/rpc/info/testSign', {
    data: 'hello12',
    // pubKey: sendKey.getPublic().encode('hex'),
    pubKey: senderPublicKey,
    sign
  });
  console.log(respose);
};
