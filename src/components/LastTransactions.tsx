import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IThunkDispatch } from '../actions';
import { getTransactions, getTransaction } from '../actions/transactions';
import {IList, IStoreState, ITransaction, IWallet} from '../configureStore';
import { Transaction } from './Transaction';
import { TransactionsHeader } from './TransactionsHeader';
import TransactionInfoPopup from "./TransactionInfoPopup";

interface IStoreStateProps {
  wallet: IWallet | null;
  transactions: IList<ITransaction>;
}

interface IDispatchProps {
  getTransactions(address: string): void;
  getTransaction(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
    isPopupShown: boolean
}

export class LastTransactionsComponent extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isPopupShown: false
    }
  }

  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
    }
  }

  public openPopup = (hash: string) => {
      this.setState({isPopupShown: true});
      this.props.getTransaction(hash);
  }
  public closePopup = () => this.setState({isPopupShown: false});

  public render() {
    const transactions: ITransaction[] = this.props.transactions.list.slice(0, 15);
    const transactionList = transactions.map(transaction => (
      <Transaction key={transaction.hash} transaction={transaction} popUpOpen={(hash: string) => this.openPopup(hash)}/>
    ));

    return (
      <>
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
              View All Transactions <span>{this.props.transactions.totalCount}</span>
            </Link>
          </div>
        </div>
        { this.state.isPopupShown && <TransactionInfoPopup closePopup={this.closePopup}/> }
      </>
    );
  }
}

const mapStateToProps = ({ transactions, wallet }: IStoreState) => ({ transactions, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address)),
  getTransaction: (address: string) => dispatch(getTransaction(address))
});

export const LastTransactions = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(LastTransactionsComponent);
