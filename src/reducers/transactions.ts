import { ActionType } from '../actions/actionType';
import { TransactionAction } from '../actions/transactions';

export const transactions = (state = [], action: TransactionAction) => {
  switch (action.type) {
    case ActionType.SET_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
};
