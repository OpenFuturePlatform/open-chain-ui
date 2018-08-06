import { ActionType } from '../actions/actionType';
import { WalletAction } from '../actions/wallet';
import { IWallet } from '../configureStore';

export const wallet = (state = null, action: WalletAction) => {
  switch (action.type) {
    case ActionType.SAVE_WALLET:
      const newWallet: IWallet = action.payload;
      return { ...newWallet };
    case ActionType.CLEAR_WALLET:
      return null;
    default:
      return state;
  }
};
