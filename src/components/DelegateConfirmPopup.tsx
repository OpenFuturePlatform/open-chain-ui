import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';
import { withSuccessPopup } from './withSuccessPopup';

interface IProps {
  isVisible: boolean;
  publicKey: string;
  amount: number;
  fee: number;
  onSubmit(): Promise<void>;
  onClose(): void;
}

export const DelegateConfirmPopupComponent = ({ isVisible, amount, publicKey, fee, onClose, onSubmit }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup" onSubmit={onSubmit}>
        <h2>
          Become <br />a Delegate
        </h2>
        <div className="info">
          <span className="title">delegate key</span>
          <span className="wrapable-address">{publicKey}</span>
        </div>
        <div className="info">
          <span className="title">amount</span>
          <span>{amount}</span>
        </div>
        <div className="info">
          <span className="title">fee</span>
          <span>{fee} open</span>
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

export const DelegateConfirmPopup = withSuccessPopup<IProps>(DelegateConfirmPopupComponent);
