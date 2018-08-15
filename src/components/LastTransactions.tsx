import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions } from '../actions/transactions';
import { IStoreState, ITransaction, IWallet } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import { formatDate } from '../utils/format-date';

interface IStoreStateProps {
  wallet: IWallet | null;
  transactions: ITransaction[];
}

interface IDispatchProps {
  getTransactions(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

export class LastTransactionsComponent extends React.Component<IProps> {
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
    }
  }

  public copyAddress = (value: string) => copy2Clipboard(value);

  public renderTransactions = (transactions: ITransaction[]) =>
    transactions.map(transaction => (
      <div key={transaction.senderAddress + transaction.recipientAddress} className="transaction">  
        <p className="from copy" onClick={() => this.copyAddress(transaction.senderAddress)}>
          {transaction.senderAddress}
        </p>
        <p className="to copy" onClick={() => this.copyAddress(transaction.recipientAddress)}>
          {transaction.recipientAddress}
        </p>
        <p className="date">{formatDate(transaction.timestamp)}</p>
        <p className="amount">{transaction.amount}</p>
        <p className="fee">{transaction.fee}</p>
      </div>
    ));

  public render() {
    // const transactions: ITransaction[] = this.props.transactions;
    const transactions = [
      {
        amount: 1000,
        fee: 20,
        recipientAddress: '0xC2d5a01Cc22295fF4cC49dB5A0013cE911D9A5cb',
        senderAddress: '0x8A1D90a716DB145ef5677553fAc096608416eEE9',
        senderPublicKey: '02b28915709de8260a529155fb83bc487fe076d933f864b3e37f953fd8d0cbfd20',
        senderSignature: '02f4cafe456378101d7f8660dda0fa2a3811b183707510030ee36a2e744dd57e77',
        timestamp: 1534149753000
      }
    ];
    return (
      <div className="table-section">
        <div className="title">
          <h3>Last transactions</h3>
          <a href="#" className="button small">
            <div />
            <span>Create transaction</span>
          </a>
        </div>
        <div className="list">
          <div className="head">
            <p className="from">From</p>
            <p className="to">To</p>
            <p className="date">Date</p>
            <p className="amount">
              Amount <span>open</span>
            </p>
            <p className="fee">
              Fee <span>open</span>
            </p>
          </div>
          {this.renderTransactions(transactions.slice(0, 15))}
          <a href="#" className="all">
            View All Transactions <span>{transactions.length}</span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, wallet }: IStoreState) => ({ transactions, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address))
});

export const LastTransactions = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(LastTransactionsComponent);
