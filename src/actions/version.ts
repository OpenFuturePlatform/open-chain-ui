import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';

interface IGetVersionResponse {
  body: string;
}

export type VersionAction = SaveVersion;

class SaveVersion extends ActionCreator implements IAction<string> {
  public readonly type = ActionType.SAVE_VERSION;
  constructor(public readonly payload: string) {
    super();
  }
}

export const getVersion = (): IThunkAction<VersionAction> => async (dispatch: Dispatch<SaveVersion>) => {
  const { data } = await axios.get<IGetVersionResponse>('/rpc/info/getVersion');
  const payload: string = data.body;
  dispatch(new SaveVersion(payload));
};
