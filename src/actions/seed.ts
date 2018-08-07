import { ActionType } from './actionType';
import { ActionCreator, IAction } from './index';

export type SeedAction = SaveSeed | ClearSeed;

export class SaveSeed extends ActionCreator implements IAction<string> {
  public readonly type: ActionType.SAVE_SEED = ActionType.SAVE_SEED;
  constructor(public readonly payload: string) {
    super();
  }
}

export class ClearSeed extends ActionCreator implements IAction<string> {
  public readonly type: ActionType.CLEAR_SEED = ActionType.CLEAR_SEED;
  public readonly payload: '' = '';
}
