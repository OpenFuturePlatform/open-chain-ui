import * as React from 'react';
import { IDelegate } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';

interface IProps {
  delegate: IDelegate
  recallVoteDelegate({nodeId, fee}: {nodeId: string, fee: number}): void
}

export const CastedVotesDelegate = ({ delegate, recallVoteDelegate }: IProps) => {
  const onCopyHandler = (value: string) => copy2Clipboard(value);

  return (
    <div className="delegate">
      <p className="address copy" onClick={() => onCopyHandler(delegate.address)}>{delegate.address}</p>
      <p className="node-id copy" onClick={() => onCopyHandler(delegate.nodeId)}>{delegate.nodeId}</p>
      <p className="amount-delegate">
        {delegate.votesCount}
      </p>
      <p className="date-delegate">{delegate.timestamp}</p>
      <a className="btn" onClick={() => recallVoteDelegate({nodeId: delegate.nodeId, fee: 1})}><span>Recall</span></a>
    </div>
  )
};
