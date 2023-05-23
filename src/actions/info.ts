import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from './actionType';
import { ActionCreator, IAction, IThunkAction } from './index';
import {IInfo} from "./transactions";

interface IGetInfoResponse {
  payload: IInfo;
}

export type InfoAction = SaveInfo;

class SaveInfo extends ActionCreator implements IAction<IInfo> {
  public readonly type = ActionType.SAVE_INFO;
  constructor(public readonly payload: IInfo) {
    super();
  }
}

export const getInfo = (): IThunkAction<InfoAction> => async (dispatch: Dispatch<SaveInfo>) => {
  const { data } = await axios.get<IGetInfoResponse>('/rpc/info');
  const payloads: IInfo = data.payload;
  //  dispatch(new SaveInfo(payload));
  dispatch({type:ActionType.SAVE_INFO, payload:payloads});
};
