import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createVoteTransaction } from '../actions/transactions';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import {ErrorField, parseApiError} from '../utils/parseApiError';
import { DelegateTabs } from './DelegateTabs';
import { VoteConfirmPopup } from './VoteConfirmPopup';
import {DELEGATE_FEE} from "../const/transactions";
import {ErrorPopup} from "./ErrorPopup";

interface IDispatchProps {
  createVoteTransaction({fee, delegate}: {fee: number, delegate: string}): Promise<void>;
}

interface IState {
  delegate: string;
  delegateError: string;
  fee: string;
  feeError: string;
  errorPopupMessage: string;
  isShowConfirm: boolean;
  isShowError: boolean;
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
    errorPopupMessage: '',
    isShowConfirm: false,
    isShowError: false,
  });

  public onDelegateChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ delegate: e.target.value });
  public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const fee = getNumbersOnly(initial);
    this.setState({ fee });
  };

  public isConfirmDisabled = () => !this.state.delegate;

  public onCloseConfirm = () => this.setState({ isShowConfirm: false });
  public onShowConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ isShowConfirm: true });
  };

  public onCloseError = () => this.setState({ isShowError: false });

  public onSubmit = async () => {
    const {delegate} = this.state;
    const fee = DELEGATE_FEE;
    try {
      await this.props.createVoteTransaction({fee, delegate});
      this.setState(this.getDefaultState);
    } catch (e) {
      const {message, field} = parseApiError(e);
      this.setState({ isShowConfirm: false });

      switch (field) {
        case ErrorField.RECIPIENT:
          this.setState({ delegateError: message });
          throw e;
        case ErrorField.AMOUNT:
          this.setState({ feeError: message });
          throw e;
        default:
          this.setState({ errorPopupMessage: message, isShowError: true  });
          throw e;
      }

    }
  };

  public render() {
    const { delegate, delegateError, feeError, isShowConfirm, isShowError, errorPopupMessage } = this.state;
    const confirmDisabled = this.isConfirmDisabled();
    const fee = DELEGATE_FEE.toString();

    return (
      <div className="left-section">
        <form className="delegate-form" onSubmit={this.onShowConfirm}>
          <DelegateTabs />
          <div className="vote-section">
            <h2>Vote</h2>
            <div className={`input ${delegateError && 'invalid'}`}>
              <p className="required">Node ID</p>
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
              <p className="required">Fee</p>
              <span className="error">{feeError}</span>
              <input
                className="disable"
                type="text"
                placeholder="Fee"
                required={true}
                value={fee}
                onChange={this.onFeeChange}
                disabled={true}
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
        <ErrorPopup isVisible={isShowError} errorMessage={errorPopupMessage} onClose={this.onCloseError}/>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createVoteTransaction: ({fee, delegate}: {fee: number, delegate: string}) => dispatch(createVoteTransaction({fee, delegate}))
});

export const VoteForm = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VoteFormComponent);
