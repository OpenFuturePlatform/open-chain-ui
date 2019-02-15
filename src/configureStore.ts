import { applyMiddleware, createStore } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { IAction } from './actions/index';
import { mainReducer } from './reducers';

export interface IKeys {
  readonly publicKey: string;
  readonly privateKey: string;
}

export interface IWallet {
  readonly keys: IKeys;
  readonly address: string;
}

export interface IDelegate {
  // readonly publicKey: string;
  readonly delegateKey: string;
  readonly address: string;
  // readonly nodeId: string;
  readonly id: number;
  readonly votesCount: number;
  readonly rating: number;
  readonly timestamp: number;
}

export interface ICastedVotesDelegate extends IDelegate {
  readonly recalled: boolean
}

export interface ITransactionCandidate {
  readonly fee: number;
  readonly amount: number;
  readonly recipientAddress: string;
  readonly data: string;
  readonly status?: boolean;
}

export interface IUnsignedTransaction extends ITransactionCandidate {
  readonly senderPublicKey: string;
  readonly senderAddress: string;
  readonly timestamp: number;
}

export interface ISignature {
  readonly senderSignature: string;
  readonly hash: string;
}

export interface ITransaction extends IUnsignedTransaction, ISignature {}

export interface IDelegateCandidate {
  readonly timestamp: number;
  readonly fee: number;
  readonly senderAddress: string;
  readonly delegateKey: string;
  readonly amount: number;
  readonly senderPublicKey: string;
}

export interface IDelegateTransaction extends IDelegateCandidate, ISignature {}

export interface IVoteCandidate {
  readonly timestamp: number;
  readonly fee: number;
  readonly senderAddress: string;
  readonly voteTypeId: number;
  readonly delegateKey: string;
  readonly senderPublicKey: string;
}

export interface IVoteTransaction extends IVoteCandidate, ISignature {}

export interface IList<T> {
  readonly list: T[];
  readonly totalCount: number;
}

export interface IStoreState {
  readonly version: string;
  readonly seed: string;
  readonly wallet: IWallet | null;
  readonly balance: string;
  readonly info: any;
  readonly delegates: IList<IDelegate>;
  readonly castedVotesDelegates: ICastedVotesDelegate;
  readonly transactions: IList<ITransaction>;
  readonly transaction: ITransaction | null;
}

const initState = {};

export const configureStore = () =>
  createStore<IStoreState, IAction, object, object>(
    mainReducer,
    initState,
    applyMiddleware(reduxThunk as ThunkMiddleware<IStoreState>)
  );
