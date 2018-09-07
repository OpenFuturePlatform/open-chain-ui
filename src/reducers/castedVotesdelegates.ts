import { ActionType } from '../actions/actionType';
import { DelegateAction, AppendToDelegateAction } from '../actions/castedVotesDelegates';
import { IDelegate, IList } from '../configureStore';

const initState: IList<IDelegate> = {
  list: [],
  totalCount: 0
};

export const castedVotesDelegates = (state = initState, action: DelegateAction | AppendToDelegateAction) => {
  switch (action.type) {
    case ActionType.SET_CASTED_VOTES_DELEGATES:
      return action.payload;
    case ActionType.SET_APPEND_TO_CASTED_VOTES_DELEGATES:
      return {totalCount: action.payload.totalCount, list: [...state.list, ...action.payload.list]};
    default:
      return state;
  }
};
