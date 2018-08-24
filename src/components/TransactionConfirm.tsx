import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';
import { ITransactionCandidate } from '../configureStore';
import { withSuccessPopup } from './withSuccessPopup';

interface IProps {
  isVisible: boolean;
  address: string;
  transaction: ITransactionCandidate;
  onSubmit(): Promise<void>;
  onClose(): void;
}

const TransactionConfirmComponent = ({ isVisible, transaction, address, onSubmit, onClose }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup">
        <h2>
          Confirm <br /> transaction
        </h2>
        <div className="info">
          <span className="title">from</span>
          <span>{address}</span>
        </div>
        <div className="info">
          <span className="title">to</span>
          <span>{transaction.recipientAddress}</span>
        </div>
        <div className="info">
          <span className="title">amount</span>
          <span>
            <p>{transaction.amount} OPEN</p>
          </span>
        </div>
        <div className="info">
          <span className="title">fee amount</span>
          <span>{transaction.fee} OPEN</span>
        </div>
        <div className="button-area">
          <button className="button mini" onClick={onSubmit}>
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

export const TransactionConfirm = withSuccessPopup<IProps>(TransactionConfirmComponent);
