import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createVoteTransaction } from '../actions/transactions';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { parseApiError } from '../utils/parseApiError';
import { DelegateTabs } from './DelegateTabs';
import { VoteConfirmPopup } from './VoteConfirmPopup';

interface IDispatchProps {
  createVoteTransaction(): Promise<void>;
}

interface IState {
  delegate: string;
  delegateError: string;
  fee: string;
  feeError: string;
  isShowConfirm: boolean;
}

class VoteFormComponent extends React.Component<IDispatchProps, IState> {
  public constructor(props: IDispatchProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  public getDefaultState = () => ({
    delegate: '',
    delegateError: '',
    fee: '',
    feeError: '',
    isShowConfirm: false
  });

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
    try {
      await this.props.createVoteTransaction();
      this.setState(this.getDefaultState);
    } catch (e) {
      const { message } = parseApiError(e);
      this.setState({ delegateError: message, isShowConfirm: false });
      throw e;
    }
  };

  public render() {
    const { delegate, delegateError, fee, feeError, isShowConfirm } = this.state;
    const confirmDisabled = this.isConfirmDisabled();

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
            <div />
            <button className={`button mini ${confirmDisabled && 'disable'}`}>
              <div />
              <span>confirm</span>
            </button>
          </div>
        </form>
        <VoteConfirmPopup
          isVisible={isShowConfirm}
          delegate={delegate}
          fee={fee}
          onSubmit={this.onSubmit}
          onClose={this.onCloseConfirm}
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createVoteTransaction: () => dispatch(createVoteTransaction())
});

export const VoteForm = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VoteFormComponent);
