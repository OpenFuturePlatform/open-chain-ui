import * as React from 'react';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { DelegateTabs } from './DelegateTabs';
import { VoteConfirmPopup } from './VoteConfirmPopup';

interface IState {
  delegate: string;
  fee: string;
  isShowConfirm: boolean;
}

export class VoteForm extends React.Component<{}, IState> {
  public state = {
    delegate: '',
    fee: '',
    isShowConfirm: false
  };

  public onDelegateChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ delegate: e.target.value });
  public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const fee = getNumbersOnly(initial);
    this.setState({ fee });
  };

  public isConfirmDisabled = () => !this.state.delegate || !this.state.fee;

  public onCloseConfirm = () => this.setState({ isShowConfirm: false });
  public onShowConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ isShowConfirm: true });
  };

  public onSubmit = async () => {
    console.log('submit');
  };

  public render() {
    const { delegate, fee, isShowConfirm } = this.state;
    const confirmDisabled = this.isConfirmDisabled();
    const delegateError = 'Delegate Error';
    const feeError = 'Fee Error';

    return (
      <div className="left-section">
        <form className="delegate-form" onSubmit={this.onShowConfirm}>
          <DelegateTabs />
          <div className="vote-section">
            <h2>Vote</h2>
            <div className={`input ${delegateError && 'invalid'}`}>
              <p className="required">Delegate's address</p>
              <span className="error">{delegateError}</span>
              <input
                className=""
                type="text"
                placeholder="Wallet"
                required={true}
                value={delegate}
                onChange={this.onDelegateChange}
              />
            </div>
            <div className={`input ${feeError && 'invalid'}`}>
              <p className="required">Fee Amount</p>
              <span className="error">{feeError}</span>
              <input
                className=""
                type="text"
                placeholder="Fee Amount"
                required={true}
                value={fee}
                onChange={this.onFeeChange}
              />
            </div>
            <button className={`button mini ${confirmDisabled && 'disable'}`}>
              <div />
              <span>confirm</span>
            </button>
          </div>
        </form>
        {isShowConfirm && (
          <VoteConfirmPopup delegate={delegate} fee={fee} onSubmit={this.onSubmit} onClose={this.onCloseConfirm} />
        )}
      </div>
    );
  }
}
