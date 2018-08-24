import * as React from 'react';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { DelegateConfirmConfirmPopup } from './DelegateConfirmPopup';
import { DelegateTabs } from './DelegateTabs';

interface IState {
  fee: string;
  isShowConfirm: boolean;
}

export class BecomeDelegateForm extends React.Component<{}, IState> {
  public state = {
    fee: '',
    isShowConfirm: false
  };

  public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const fee = getNumbersOnly(initial);
    this.setState({ fee });
  };

  public isConfirmDisabled = () => !this.state.fee;

  public onCloseConfirm = () => this.setState({ isShowConfirm: false });
  public onShowConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ isShowConfirm: true });
  };

  public onSubmit = async () => {
    console.log('submit');
  };

  public render() {
    const { isShowConfirm, fee } = this.state;
    const confirmDisabled = this.isConfirmDisabled();
    const feeError = 'Fee Error';

    return (
      <div className="left-section">
        <form className="delegate-form" onSubmit={this.onShowConfirm}>
          <DelegateTabs />
          <div className="BaD-section">
            <h2>
              Become <br />a Delegate
            </h2>
            {/* <div className="input">
              <p>FROM</p>
              <input
                className="disable"
                type="text"
                placeholder="Wallet Address"
                value="0XFF7508C54D3EF2141D05F7EB1A0CC719"
              />
            </div> */}
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
          </div>
          <button className={`button mini ${confirmDisabled && 'disable'}`}>
            <div />
            <span>confirm</span>
          </button>
        </form>
        {isShowConfirm && (
          <DelegateConfirmConfirmPopup fee={fee} onClose={this.onCloseConfirm} onSubmit={this.onSubmit} />
        )}
      </div>
    );
  }
}
