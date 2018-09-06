import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IThunkDispatch } from '../actions';
import { getTransactions } from '../actions/transactions';
import {IList, IStoreState, ITransaction, IWallet} from '../configureStore';
import { Transaction } from './Transaction';
import { TransactionsHeader } from './TransactionsHeader';

interface IStoreStateProps {
  wallet: IWallet | null;
  transactions: IList<ITransaction>;
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

  public render() {
    const transactions: ITransaction[] = this.props.transactions.list.slice(0, 15);
    const transactionList = transactions.map(transaction => (
      <Transaction key={transaction.hash} transaction={transaction} />
    ));
    return (
      <div className="table-section">
        <div className="title">
          <h3>Last transactions</h3>
          <Link to="/wallet/transactions" className="button small">
            <div />
            <span>Create transaction</span>
          </Link>
        </div>
        <div className="list">
          <TransactionsHeader />
          {transactionList}
          <Link to="/wallet/transactions" className="all">
            View All Transactions <span>{transactions.length}</span>
          </Link>
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
