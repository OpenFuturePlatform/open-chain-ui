import { ActionType } from '../actions/actionType';
import { DelegateAction } from '../actions/castedVotesDelegates';
import {ICastedVotesDelegate} from '../configureStore';

const initState: ICastedVotesDelegate | null = null;

export const castedVotesDelegates = (state = initState, action: DelegateAction) => {
  switch (action.type) {
    case ActionType.SET_CASTED_VOTES_DELEGATES:
      return action.payload;

    default:
      return state;
  }
};
