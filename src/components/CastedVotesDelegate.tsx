import * as React from 'react';
import {ICastedVotesDelegate} from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import {formatDate} from "../utils/format-date";

interface IProps {
  isRecallButtonDisabled: boolean
  delegate: ICastedVotesDelegate
  recallVoteDelegate({delegateKey, fee}: {delegateKey: string, fee: number}): void
}

export const CastedVotesDelegate = ({ delegate, recallVoteDelegate, isRecallButtonDisabled }: IProps) => {
  if (!delegate) {
      return null;
  }
  const onCopyHandler = (value: string) => copy2Clipboard(value);

  return (
    <div className="delegate">
      <p className="address copy" onClick={() => onCopyHandler(delegate.address)}>{delegate.address}</p>
      <p className="node-id copy" onClick={() => onCopyHandler(delegate.delegateKey)}>{delegate.delegateKey}</p>
      <p className="amount-delegate">
        {delegate.votesCount}
      </p>
      <p className="date-delegate">{formatDate(delegate.timestamp)}</p>
      <a className="btn" onClick={() => recallVoteDelegate({delegateKey: delegate.delegateKey, fee: 1})}>
        <span className={`${(delegate.recalled || isRecallButtonDisabled) && 'pending'}`}>{delegate.recalled ? 'Pending' : 'Recall'}</span>
      </a>
    </div>
  )
};
