import { ActionType } from '../actions/actionType';
import {AppendToTransactionsAction, TransactionsAction} from '../actions/transactions';
import {IList, ITransaction} from "../configureStore";

const initState: IList<ITransaction> = {
  list: [],
  totalCount: 0
};

export const transactions = (state = initState, action: TransactionsAction | AppendToTransactionsAction) => {
  switch (action.type) {
    case ActionType.SET_TRANSACTIONS:
      return action.payload;
    case ActionType.SET_APPEND_TO_TRANSACTIONS:
      return {totalCount: action.payload.totalCount, list: [...state.list, ...action.payload.list]};
    default:
      return state;
  }
};
