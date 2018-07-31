import { EventType } from '../actions/event-types';
import { IWallet } from '../configureStore';
import { IEvent } from './index';

export const wallet = (state = null, action: IEvent<IWallet>) => {
  switch (action.type) {
    case EventType.SAVE_WALLET:
      const newWallet: IWallet = action.payload;
      return { ...newWallet };
    case EventType.CLEAR_WALLET:
      return null;
    default:
      return state;
  }
};
