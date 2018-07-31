import axios from 'axios';
import { Dispatch } from 'redux';
import { IKeys, IWallet } from '../configureStore';
import { IEvent } from '../reducers/index';
import { EventType } from './event-types';

interface IGetVersionResponse {
  body: string;
}

export const getVersion = () => async (dispatch: Dispatch) => {
  const { data } = await axios.get<IGetVersionResponse>('/rpc/info/getVersion');
  const payload: string = data.body;
  dispatch<IEvent<string>>({ type: EventType.SAVE_VERSION, payload });
};

interface IGenerateSeedPhraseResponse {
  seedPhrase: string;
  masterKeys: IKeys;
  defaultWallet: IWallet;
}

export const generateWallet = () => async (dispatch: Dispatch) => {
  const { data } = await axios.get<IGenerateSeedPhraseResponse>('/rpc/accounts/doGenerate');
  const payload = data.defaultWallet;
  dispatch<IEvent<IWallet>>({ type: EventType.SAVE_WALLET, payload });
  return data;
};
