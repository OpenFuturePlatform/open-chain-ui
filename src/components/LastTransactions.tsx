import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions } from '../actions/transactions';
import { IStoreState, ITransaction, IWallet } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';

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
        {/* <p className="date">12/12/2018, 10:21 PM</p> */}
        <p className="amount">{transaction.amount}</p>
        <p className="fee">{transaction.fee}</p>
      </div>
    ));

  public render() {
    const transactions: ITransaction[] = this.props.transactions;
    return (
      <div className="table-section">
        <div className="title">
          <h3>Last transactions</h3>
          {/* <a href="#" className="button small">
            <div />
            <span>Create transaction</span>
          </a> */}
        </div>
        <div className="list">
          <div className="head">
            <p className="from">From</p>
            <p className="to">To</p>
            <p className="date" />
            <p className="amount">
              Amount <span>open</span>
            </p>
            <p className="fee">
              Fee <span>open</span>
            </p>
          </div>
          {this.renderTransactions(transactions)}
          {/* <a href="#" className="all">
            View All Transactions <span>231</span>
          </a> */}
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
