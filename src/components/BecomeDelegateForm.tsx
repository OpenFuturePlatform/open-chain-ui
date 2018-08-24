import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createDelegateTransaction } from '../actions/transactions';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { parseApiError } from '../utils/parseApiError';
import { DelegateConfirmPopup } from './DelegateConfirmPopup';
import { DelegateTabs } from './DelegateTabs';

interface IDispatchProps {
  createDelegateTransaction(): Promise<void>;
}

interface IState {
  fee: string;
  feeError: string;
  isShowConfirm: boolean;
}

class BecomeDelegateFormComponent extends React.Component<IDispatchProps, IState> {
  public constructor(props: IDispatchProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  public getDefaultState = () => ({
    fee: '',
    feeError: '',
    isShowConfirm: false
  });

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
    try {
      await this.props.createDelegateTransaction();
      this.setState(this.getDefaultState());
    } catch (e) {
      const { message } = parseApiError(e);
      this.setState({ feeError: message, isShowConfirm: false });
      throw e;
    }
  };

  public render() {
    const { isShowConfirm, fee, feeError } = this.state;
    const confirmDisabled = this.isConfirmDisabled();

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
        <DelegateConfirmPopup
          isVisible={isShowConfirm}
          fee={fee}
          onClose={this.onCloseConfirm}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createDelegateTransaction: () => dispatch(createDelegateTransaction())
});

export const BecomeDelegateForm = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BecomeDelegateFormComponent);
