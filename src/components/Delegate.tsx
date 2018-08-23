import * as React from 'react';
import { IDelegate } from '../configureStore';
import close from '../img/close.svg';

interface IProps {
  delegate: IDelegate;
}

export const Delegate = ({ delegate }: IProps) => (
  <div className="delegate">
    <p className="rank">{delegate.rank}</p>
    <p className="address">{delegate.address}</p>
    <p className="amount-delegate">
      {delegate.votes}
      <a className="your-vote">
        Your Vote <img src={close} alt="X" />
      </a>
    </p>
    <p className="date-delegate" />
  </div>
);
