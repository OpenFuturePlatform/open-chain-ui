import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { createTransaction } from '../actions/transactions';
import { IStoreState, ITransactionCandidate, IWallet } from '../configureStore';
import { getNumbersOnly } from '../utils/getNumbersOnly';
import { parseApiError } from '../utils/parseApiError';

interface IStoreStateProps {
  wallet: IWallet | null;
}

interface IDispatchProps {
  createTransaction(transaction: ITransactionCandidate): void;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
  recipientAddress: string;
  recipientAddressError: string;
  amount: string;
  fee: string;
}

export class TransactionCreateComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  public getDefaultState = () => ({
    amount: '',
    fee: '',
    recipientAddress: '',
    recipientAddressError: ''
  });

  public isConfirmDisabled = () => !this.state.amount || !this.state.fee || !this.state.recipientAddress;

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

  public onConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { amount, recipientAddress, fee } = this.state;
    try {
      await this.props.createTransaction({
        amount: Number(amount),
        fee: Number(fee),
        recipientAddress
      });
      this.setState(this.getDefaultState());
    } catch (e) {
      const message = parseApiError(e);
      this.setState({ recipientAddressError: message });
    }
  };

  public render() {
    const { recipientAddress, amount, fee, recipientAddressError } = this.state;
    const { wallet } = this.props;
    const senderAddress = wallet ? wallet.address : '';
    const confirmDisabled = this.isConfirmDisabled();
    return (
      <form className="create-transaction" onSubmit={this.onConfirm}>
        <h2>Create Transaction</h2>
        <div className="input">
          <p>From</p>
          <input type="text" placeholder="Wallet Address" className="disable" value={senderAddress} />
        </div>
        <div className={`input ${recipientAddressError && 'invalid'}`}>
          <p className="required">To</p>
          <span className="error">{recipientAddressError}</span>
          <input
            type="text"
            placeholder="Wallet Address"
            required={true}
            value={recipientAddress}
            onChange={this.onAddressChange}
          />
        </div>
        <div className="input">
          <p className="required">Amount</p>
          <input type="text" placeholder="Amount" required={true} value={amount} onChange={this.onAmountChange} />
        </div>
        <div className="input">
          <p className="required">Fee</p>
          <input type="text" placeholder="Fee" required={true} value={fee} onChange={this.onFeeChange} />
        </div>
        <button className={`button mini ${confirmDisabled ? 'disable' : ''}`}>
          <div />
          <span>confirm</span>
        </button>
      </form>
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
