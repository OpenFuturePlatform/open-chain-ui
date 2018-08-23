import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';
import { ITransactionCandidate } from '../configureStore';

interface IProps {
  address: string;
  transaction: ITransactionCandidate;
  onConfirm(): void;
  onClose(): void;
}

export class TransactionPreviewPopup extends React.Component<IProps> {
  public onClose = () => this.props.onClose();

  public onConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onConfirm();
  };

  public render() {
    const { address, transaction } = this.props;
    const { recipientAddress, amount, fee } = transaction;

    return (
      <PopupBackgroundArea onClick={this.onClose}>
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
            <span>{recipientAddress}</span>
          </div>
          <div className="info">
            <span className="title">amount</span>
            <span>
              {amount} <p>FEE: {fee} OPEN</p>
            </span>
          </div>
          <div className="button-area">
            <button className="button mini" onClick={this.onConfirm}>
              <div />
              <span>Confirm</span>
            </button>
            <button className="button mini white" onClick={this.onClose}>
              <div />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </PopupBackgroundArea>
    );
  }
}
