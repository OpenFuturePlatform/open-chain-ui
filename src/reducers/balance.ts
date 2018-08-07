import { ActionType } from '../actions/actionType';
import { BalanceAction } from '../actions/balance';

export const balance = (state = '', action: BalanceAction) => {
  switch (action.type) {
    case ActionType.SET_BALANCE:
      return action.payload;
    case ActionType.CLEAN_BALANCE:
      return '';
    default:
      return state;
  }
};
