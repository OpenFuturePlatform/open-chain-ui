import { ActionType } from '../actions/actionType';
import {AppendToTransactionsAction, TransactionAction} from '../actions/transactions';
import {ITransaction} from "../configureStore";

const initState: ITransaction | null = null

export const transaction = (state = initState, action: TransactionAction | AppendToTransactionsAction) => {
    switch (action.type) {
        case ActionType.SET_TRANSACTION:
            return action.payload;
        default:
            return state;
    }
};
