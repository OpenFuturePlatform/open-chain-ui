import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';
import { withSuccessPopup } from './withSuccessPopup';

interface IProps {
  isVisible: boolean;
  delegate: string;
  fee: string;
  onSubmit(): Promise<void>;
  onClose(): void;
}

const VoteConfirmPopupComponent = ({ isVisible, delegate, fee, onClose, onSubmit }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup" onSubmit={onSubmit}>
        <h2>Vote</h2>
        <div className="info">
          <span className="title">Delegate's address</span>
          <span className="wrapable-address">{delegate}</span>
        </div>
        <div className="info">
          <span className="title">fee</span>
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

export const VoteConfirmPopup = withSuccessPopup<IProps>(VoteConfirmPopupComponent);
