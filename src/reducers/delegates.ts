import { ActionType } from '../actions/actionType';
import { DelegateAction } from '../actions/delegates';
import { IDelegate, IList } from '../configureStore';

const initState: IList<IDelegate> = {
  list: [],
  totalCount: 0
};

export const delegates = (state = initState, action: DelegateAction) => {
  switch (action.type) {
    case ActionType.SET_DELEGATES:
      return action.payload;
    default:
      return state;
  }
};
