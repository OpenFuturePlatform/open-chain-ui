import { ActionType } from '../actions/actionType';
import {AppendToDelegateAction, DelegateAction} from '../actions/delegates';
import { IDelegate, IList } from '../configureStore';

const initState: IList<IDelegate> = {
  list: [],
  totalCount: 0
};

export const delegates = (state = initState, action: DelegateAction | AppendToDelegateAction) => {
  switch (action.type) {
    case ActionType.SET_DELEGATES:
      return action.payload;
    case ActionType.SET_APPEND_TO_DELEGATES:
      return {totalCount: action.payload.totalCount, list: [...state.list, ...action.payload.list]};
    default:
      return state;
  }
};
