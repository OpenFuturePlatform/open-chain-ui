import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions, appendToTransactions } from '../actions/transactions';
import { getBalance } from '../actions/balance';
import {IList, IStoreState, ITransaction, IWallet} from '../configureStore';
import { Transaction } from './Transaction';
import { TransactionsHeader } from './TransactionsHeader';
import {InfiniteScrollComponent} from "./InfiniteScroll";

interface IStoreStateProps {
  wallet: IWallet | null;
  transactions: IList<ITransaction>;
}

interface IDispatchProps {
  getTransactions(address: string): void;
  appendToTransactions(address: string): void;
  getBalance(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

export class AllTransactionsComponent extends React.Component<IProps> {
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
      this.props.getBalance(wallet.address);
    }
  }

  public onLoadMore = () => {
    const { wallet } = this.props;
    if (wallet) {
      this.props.appendToTransactions(wallet.address);
    }
  }

  public render() {
    const transactions: IList<ITransaction>= this.props.transactions;

    return (
      <div className="table-section">
        <div className="title">
          <h3>Last transactions</h3>
        </div>
        <div className="list">
          <TransactionsHeader />
          <InfiniteScrollComponent data={transactions} onLoadMore={this.onLoadMore}>
            {transactions.list && transactions.list.map(transaction =>
              <Transaction key={transaction.hash} transaction={transaction}/>
            )}
          </InfiniteScrollComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, wallet }: IStoreState) => ({ transactions, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address)),
  appendToTransactions: (address: string) => dispatch(appendToTransactions(address)),
  getBalance: (address: string) => dispatch(getBalance(address))
});

export const AllTransactions = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AllTransactionsComponent);
