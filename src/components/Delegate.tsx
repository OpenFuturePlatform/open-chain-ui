import * as React from 'react';
import { IDelegate } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import {formatDate} from "../utils/format-date";

interface IProps {
  delegate: IDelegate
  isVoted?: boolean
  rank: number
}

export const Delegate = ({ delegate, isVoted, rank }: IProps) => {
  const onCopyHandler = (value: string) => copy2Clipboard(value);

  return (
    <div className="delegate">
      <p className="rank">{rank}</p>
      <p className="address copy" onClick={() => onCopyHandler(delegate.address)}>{delegate.address}</p>
      <p className="node-id copy" onClick={() => onCopyHandler(delegate.nodeId)}>{delegate.nodeId}</p>
      <p className="amount-delegate">
        {delegate.votesCount}
        {
          isVoted &&
          <a className="your-vote">
            Your Vote
          </a>
        }
      </p>
      <p className="date-delegate">{formatDate(delegate.timestamp)}</p>
    </div>
  )
};
