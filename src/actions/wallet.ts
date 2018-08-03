import axios from 'axios';
import { Dispatch } from 'redux';
import { IKeys, IWallet } from '../configureStore';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';
import { ClearSeed, SaveSeed, SeedAction } from './seed';

interface IGenerateSeedPhraseResponse {
  seedPhrase: string;
  masterKeys: IKeys;
  defaultWallet: IWallet;
}

export type WalletAction = SaveWallet | ClearWallet;

class SaveWallet extends ActionCreator implements IAction<IWallet> {
  public readonly type = ActionType.SAVE_WALLET;
  constructor(public readonly payload: IWallet) {
    super();
  }
}

class ClearWallet extends ActionCreator implements IAction<null> {
  public readonly type = ActionType.CLEAR_WALLET;
  public readonly payload: null = null;
}

export const generateWallet = (): IThunkAction<WalletAction> => async (
  dispatch: Dispatch<WalletAction | SeedAction>
) => {
  const { data } = await axios.get<IGenerateSeedPhraseResponse>('/rpc/accounts/doGenerate');
  const { defaultWallet, seedPhrase } = data;
  dispatch(new SaveSeed(seedPhrase));
  dispatch(new SaveWallet(defaultWallet));
};

export const cleanWallet = (): IThunkAction<WalletAction> => async (dispatch: Dispatch<WalletAction | SeedAction>) => {
  dispatch(new ClearWallet());
  const clearSeed = new ClearSeed();
  dispatch(clearSeed);
};
