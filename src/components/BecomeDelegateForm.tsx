import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createDelegateTransaction } from '../actions/transactions';
import { IStoreState } from '../configureStore';
import { DELEGATE_AMOUNT, DELEGATE_FEE } from '../const/transactions';
import { getDelegateKey } from '../utils/crypto';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import {ErrorField, parseApiError} from '../utils/parseApiError';
import { DelegateConfirmPopup } from './DelegateConfirmPopup';
import { DelegateTabs } from './DelegateTabs';
import {ErrorPopup} from "./ErrorPopup";

interface IStoreStateProps {
  publicKey: string;
}

interface IDispatchProps {
  createDelegateTransaction(): Promise<void>;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
  fee: string;
  amountError: string;
  delegateError: string;
  isShowConfirm: boolean;
  isShowError: boolean;
  errorPopupMessage: string;
}

class BecomeDelegateFormComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  public getDefaultState = () => ({
    fee: '',
    amountError: '',
    delegateError: '',
    isShowConfirm: false,
    isShowError: false,
    errorPopupMessage: '',
  });

  public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const fee = getNumbersOnly(initial);
    this.setState({ fee });
  };

  public onCloseConfirm = () => this.setState({ isShowConfirm: false });
  public onShowConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ isShowConfirm: true });
  };

  public onCloseError = () => this.setState({ isShowError: false });

  public onSubmit = async () => {
    try {
      await this.props.createDelegateTransaction();
      this.setState(this.getDefaultState());
    } catch (e) {
      const {message, field} = parseApiError(e);

      this.setState({ isShowConfirm: false });

      switch (field) {
        case ErrorField.RECIPIENT:
          this.setState({ delegateError: message });
          throw e;
        case ErrorField.AMOUNT:
          this.setState({ amountError: message });
          throw e;
        default:
          this.setState({ errorPopupMessage: message, isShowError: true  });
          throw e;
      }

      throw e;
    }
  };

  public render() {
    const { publicKey } = this.props;
    const { isShowConfirm, amountError, isShowError, errorPopupMessage, delegateError } = this.state;
    const amount = DELEGATE_AMOUNT;
    const fee = DELEGATE_FEE;

    return (
      <div className="left-section">
        <form className="delegate-form" onSubmit={this.onShowConfirm}>
          <DelegateTabs />
          <div className="BaD-section">
            <h2>
              Become <br />a Delegate
            </h2>
            <div className={`input ${delegateError && 'invalid'}`}>
              <p>Node ID</p>
              <span className="error">{delegateError}</span>
              <input className="disable" type="text" placeholder="Wallet Address" value={publicKey} onChange={() => null}
                     disabled={true}/>
            </div>
            <div className={`input ${amountError && 'invalid'}`}>
              <p className="required">Amount</p>
              <span className="error">{amountError}</span>
              <input className="disable" type="text" placeholder="Amount" required={true} value={amount} onChange={() => null}
                     disabled={true}/>
            </div>
            <div className={`input ${amountError && 'invalid'}`}>
              <p className="required">Fee</p>
              <input className="disable" type="text" placeholder="Fee" required={true} value={fee} onChange={() => null}
                     disabled={true}/>
            </div>
          </div>
          <button className="button mini">
            <div />
            <span>confirm</span>
          </button>
        </form>
        <DelegateConfirmPopup
          isVisible={isShowConfirm}
          publicKey={publicKey}
          amount={amount}
          fee={fee}
          onClose={this.onCloseConfirm}
          onSubmit={this.onSubmit}
        />
        <ErrorPopup isVisible={isShowError} errorMessage={errorPopupMessage} onClose={this.onCloseError}/>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet, info }: IStoreState) => ({ delegateKey: wallet ? getDelegateKey(wallet) : '',
    publicKey: info ? info.publicKey : ''});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createDelegateTransaction: () => dispatch(createDelegateTransaction())
});

export const BecomeDelegateForm = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BecomeDelegateFormComponent);
