import { ActionType } from '../actions/actionType';
import { InfoAction } from '../actions/info';

export const info = (state = {}, action: InfoAction) => {
  switch (action.type) {
    case ActionType.SAVE_INFO:
      return action.payload;
    default:
      return state;
  }
};
