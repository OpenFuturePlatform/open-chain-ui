import { ActionType } from '../actions/actionType';
import { WalletAction } from '../actions/wallet';
import { IWallet } from '../configureStore';

const initialState: IWallet = {
  address: 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B1342354223',
  keys: {
    privateKey: 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B3',
    publicKey: 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B3'
  }
};

export const wallet = (state = initialState, action: WalletAction) => {
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
