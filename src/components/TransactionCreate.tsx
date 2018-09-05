import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createTransaction } from '../actions/transactions';
import { IStoreState, ITransactionCandidate, IWallet } from '../configureStore';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { ErrorField, parseApiError } from '../utils/parseApiError';
import { TransactionConfirm } from './TransactionConfirm';

interface IStoreStateProps {
  wallet: IWallet | null;
}

interface IDispatchProps {
  createTransaction(transaction: ITransactionCandidate): void;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
  previewPopup: boolean;
  recipientAddress: string;
  amount: string;
  fee: string;
  amountError: string;
  recipientError: string;
}

export class TransactionCreateComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  public getDefaultState = () => ({
    amount: '',
    amountError: '',
    fee: '',
    previewPopup: false,
    recipientAddress: '',
    recipientError: ''
  });

  public isConfirmDisabled = () => !this.state.amount || !this.state.fee || !this.state.recipientAddress;

  public getTransactionCandidate = () => ({
    amount: Number(this.state.amount),
    fee: Number(this.state.fee),
    recipientAddress: this.state.recipientAddress
  });

  public showPreviewPopup = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(() => ({ previewPopup: true }));
  };
  public hidePreviewPopup = () => this.setState(() => ({ previewPopup: false }));

  public onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ recipientAddress: e.target.value });

  public onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const amount = getNumbersOnly(initial);
    this.setState({ amount });
  };

  public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initial = e.target.value || '';
    const fee = getNumbersOnly(initial);
    this.setState({ fee });
  };

  public onConfirm = async (): Promise<void> => {
    try {
      const transaction = this.getTransactionCandidate();
      await this.props.createTransaction(transaction);
      this.setState(this.getDefaultState());
    } catch (e) {
      const { message, field } = parseApiError(e);
      if (field === ErrorField.AMOUNT) {
        this.setState({ amountError: message });
      } else {
        this.setState({ recipientError: message });
      }
      throw e;
    }
  };

  public render() {
    const { recipientAddress, amount, fee, recipientError, amountError, previewPopup } = this.state;
    const { wallet } = this.props;
    const senderAddress = wallet ? wallet.address : '';
    const confirmDisabled = this.isConfirmDisabled();
    const transactionCandidate: ITransactionCandidate = this.getTransactionCandidate();

    return (
      <React.Fragment>
        <form className="create-transaction" onSubmit={this.showPreviewPopup}>
          <h2>Create Transaction</h2>
          <div className="input">
            <p>From</p>
            <input type="text" placeholder="Wallet Address" className="disable" value={senderAddress} readOnly={true} />
          </div>
          <div className={`input ${recipientError && 'invalid'}`}>
            <p className="required">To</p>
            <span className="error">{recipientError}</span>
            <input
              type="text"
              placeholder="Wallet Address"
              required={true}
              value={recipientAddress}
              onChange={this.onAddressChange}
            />
          </div>
          <div className={`input ${amountError && 'invalid'}`}>
            <p className="required">Amount</p>
            <span className="error">{amountError}</span>
            <input type="text" placeholder="Amount" required={true} value={amount} onChange={this.onAmountChange} />
          </div>
          <div className="input">
            <p className="required">Fee Amount</p>
            <input type="text" placeholder="Fee" required={true} value={fee} onChange={this.onFeeChange} />
          </div>
          <button className={`button mini ${confirmDisabled ? 'disable' : ''}`}>
            <div />
            <span>confirm</span>
          </button>
        </form>
        <TransactionConfirm
          address={wallet ? wallet.address : ''}
          transaction={transactionCandidate}
          isVisible={previewPopup}
          onClose={this.hidePreviewPopup}
          onSubmit={this.onConfirm}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ wallet }: IStoreState) => ({ wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  createTransaction: (transaction: ITransactionCandidate) => dispatch(createTransaction(transaction))
});

export const TransactionCreate = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(TransactionCreateComponent);
