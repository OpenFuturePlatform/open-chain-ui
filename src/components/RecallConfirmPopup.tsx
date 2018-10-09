import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';

interface IProps {
  isVisible: boolean;
  delegate: string;
  fee: number;
  onSubmit(): Promise<void>;
  onClose(): void;
}

export const RecallConfirmPopup = ({ isVisible, delegate, fee, onClose, onSubmit }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup recall-popup" onSubmit={onSubmit}>
        <h2>Recall Vote</h2>
        <div className="info">
          <span className="title">Delegate's address</span>
          <span className="wrapable-address">{delegate}</span>
        </div>
        <div className="info recall-info-fee">
          <span className="title">fee</span>
          <span>
            {fee} open
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
