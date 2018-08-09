import axios from 'axios';
import { Dispatch } from 'redux';
import { IKeys, IWallet } from '../configureStore';
import { mockWallet } from '../mocks/wallet';
import { ActionType } from './actionType';
import { BalanceAction, CleanBalance } from './balance';
import { ActionCreator, IAction, IThunkAction } from './index';
import { ClearSeed, SaveSeed, SeedAction } from './seed';

export interface ISeedPhraseResponse {
  payload: {
    seedPhrase: string;
    masterKeys: IKeys;
    defaultWallet: IWallet;
  };
}

export interface IRestoreByPrivateKey {
  payload: IWallet;
}

export type WalletAction = SaveWallet | ClearWallet;

export class SaveWallet extends ActionCreator implements IAction<IWallet> {
  public readonly type = ActionType.SAVE_WALLET;
  constructor(public readonly payload: IWallet) {
    super();
  }
}

class ClearWallet extends ActionCreator implements IAction<null> {
  public readonly type = ActionType.CLEAR_WALLET;
  public readonly payload: null = null;
}

const generateWalletRequest = () => {
  if (process.env.REACT_APP_IS_MOCK) {
    const data = mockWallet;
    return Promise.resolve({ data });
  } else {
    return axios.get<ISeedPhraseResponse>('/rpc/accounts/doGenerate');
  }
};

const restoreWalletRequest = (seedPhrase: string) => {
  if (process.env.REACT_APP_IS_MOCK) {
    const data = mockWallet;
    return Promise.resolve({ data });
  } else {
    return axios.post<ISeedPhraseResponse>('/rpc/accounts/doRestore', { seedPhrase });
  }
};

const getByPrivateKeyRequest = (privateKey: string) => {
  if (process.env.REACT_APP_IS_MOCK) {
    const data = { payload: mockWallet.payload.defaultWallet };
    return Promise.resolve({ data });
  } else {
    return axios.post<IRestoreByPrivateKey>('/rpc/accounts/keys/doPrivateImport', { decodedKey: privateKey });
  }
};

export const generateWallet = (): IThunkAction<WalletAction> => async (
  dispatch: Dispatch<WalletAction | SeedAction>
) => {
  const { data } = await generateWalletRequest();
  const { defaultWallet, seedPhrase } = data.payload;
  dispatch(new SaveSeed(seedPhrase));
  dispatch(new SaveWallet(defaultWallet));
};

export const restoreWallet = (seed: string): IThunkAction<WalletAction> => async (
  dispatch: Dispatch<WalletAction | SeedAction>
) => {
  const { data } = await restoreWalletRequest(seed);
  const { defaultWallet, seedPhrase } = data.payload;
  dispatch(new SaveSeed(seedPhrase));
  dispatch(new SaveWallet(defaultWallet));
};

export const getWalletByPrivateKey = (privateKey: string) => async (dispatch: Dispatch<WalletAction>) => {
  const { data } = await getByPrivateKeyRequest(privateKey);
  const wallet = data.payload;
  dispatch(new SaveWallet(wallet));
};

export const setWallet = (wallet: IWallet) => async (dispatch: Dispatch<WalletAction | SeedAction>) => {
  dispatch(new SaveWallet(wallet));
};

export const cleanWallet = (): IThunkAction<WalletAction> => async (
  dispatch: Dispatch<WalletAction | SeedAction | BalanceAction>
) => {
  dispatch(new ClearWallet());
  dispatch(new ClearSeed());
  dispatch(new CleanBalance());
};
