import { EventType } from '../actions/event-types';
import { IEvent } from './index';

export const version = (state = '', action: IEvent<string>) => {
  switch (action.type) {
    case EventType.SAVE_VERSION:
      return action.payload;
    default:
      return state;
  }
};
