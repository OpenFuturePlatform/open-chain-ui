import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createDelegateTransaction } from '../actions/transactions';
import { IStoreState } from '../configureStore';
import { DELEGATE_AMOUNT, DELEGATE_FEE } from '../const/transactions';
import { getDelegateKey } from '../utils/crypto';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { parseApiError } from '../utils/parseApiError';
import { DelegateConfirmPopup } from './DelegateConfirmPopup';
import { DelegateTabs } from './DelegateTabs';

interface IStoreStateProps {
  nodeId: string;
}

interface IDispatchProps {
  createDelegateTransaction(): Promise<void>;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
  fee: string;
  feeError: string;
  isShowConfirm: boolean;
}

class BecomeDelegateFormComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
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
    const { nodeId } = this.props;
    const { isShowConfirm, feeError } = this.state;
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
            <div className="input">
              <p>Node ID</p>
              <span className="error">{feeError}</span>
              <input className="disable" type="text" placeholder="Wallet Address" value={nodeId} onChange={() => null}
                     disabled={true}/>
            </div>
            <div className={`input ${feeError && 'invalid'}`}>
              <p className="required">Amount</p>
              <input className="disable" type="text" placeholder="Amount" required={true} value={amount} onChange={() => null}
                     disabled={true}/>
            </div>
            <div className="input">
              <p className="required">Fee</p>
              <input className="disable" type="text" placeholder="Fee Amount" required={true} value={fee} onChange={() => null}
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
          nodeId={nodeId}
          amount={amount}
          fee={fee}
          onClose={this.onCloseConfirm}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ wallet, info }: IStoreState) => ({ delegateKey: wallet ? getDelegateKey(wallet) : '',
                                                              nodeId: info ? info.nodeId : ''});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createDelegateTransaction: () => dispatch(createDelegateTransaction())
});

export const BecomeDelegateForm = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BecomeDelegateFormComponent);
