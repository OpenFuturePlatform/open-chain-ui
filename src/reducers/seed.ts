import { ActionType } from '../actions/actionType';
import { SeedAction } from '../actions/seed';

export const seed = (state = '', action: SeedAction) => {
  switch (action.type) {
    case ActionType.SAVE_SEED:
      const newSeed: string = action.payload;
      return newSeed;
    case ActionType.CLEAR_SEED:
      return '';
    default:
      return state;
  }
};
