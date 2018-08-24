import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';

interface IProps {
  delegate: string;
  fee: string;
  onSubmit(): void;
  onClose(): void;
}

export const VoteConfirmPopup = ({ delegate, fee, onClose, onSubmit }: IProps) => {
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup" onSubmit={onSubmitHandler}>
        <h2>Vote</h2>
        <div className="info">
          <span className="title">Delegate's address</span>
          <span className="vote-address">{delegate}</span>
        </div>
        <div className="info">
          <span className="title">fee amount</span>
          <span>
            {fee} open <p className="lite">1.5 open x 2</p>
          </span>
        </div>
        <div className="button-area">
          <button className="button mini">
            <div />
            <span>Confirm</span>
          </button>
          <button className="button mini white" onClick={onClose}>
            <div />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </PopupBackgroundArea>
  );
};
