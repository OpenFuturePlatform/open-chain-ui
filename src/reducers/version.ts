import { ActionType } from '../actions/actionType';
import { VersionAction } from '../actions/version';

export const version = (state = '', action: VersionAction) => {
  switch (action.type) {
    case ActionType.SAVE_VERSION:
      return action.payload;
    default:
      return state;
  }
};
