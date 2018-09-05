import { ActionType } from '../actions/actionType';
import { DelegateAction } from '../actions/castedVotesDelegates';
import { IDelegate, IList } from '../configureStore';

const initState: IList<IDelegate> = {
  list: [],
  totalCount: 0
};

export const castedVotesDelegates = (state = initState, action: DelegateAction) => {
  switch (action.type) {
    case ActionType.SET_CASTED_VOTES_DELEGATES:
      return action.payload;
    default:
      return state;
  }
};
