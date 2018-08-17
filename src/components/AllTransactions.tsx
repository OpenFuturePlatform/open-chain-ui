import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions } from '../actions/transactions';
import { IStoreState, ITransaction, IWallet } from '../configureStore';
import { Transaction } from './Transaction';
import { TransactionsHeader } from './TransactionsHeader';

interface IStoreStateProps {
  wallet: IWallet | null;
  transactions: ITransaction[];
}

interface IDispatchProps {
  getTransactions(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

export class AllTransactionsComponent extends React.Component<IProps> {
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
    }
  }

  public render() {
    const transactions: ITransaction[] = this.props.transactions;
    // const transactions1 = [
    //   {
    //     amount: 1000,
    //     fee: 20,
    //     recipientAddress: '0xC2d5a01Cc22295fF4cC49dB5A0013cE911D9A5cb',
    //     senderAddress: '0x8A1D90a716DB145ef5677553fAc096608416eEE9',
    //     senderPublicKey: '02b28915709de8260a529155fb83bc487fe076d933f864b3e37f953fd8d0cbfd20',
    //     senderSignature: '02f4cafe456378101d7f8660dda0fa2a3811b183707510030ee36a2e744dd57e77',
    //     timestamp: 1534149753000
    //   }
    // ];
    // const transactions2 = [...transactions1, ...transactions1, ...transactions1];
    // const transactions3 = [...transactions2, ...transactions2, ...transactions2];
    // const transactions = [...transactions3, ...transactions3, ...transactions3];

    const transactionList = transactions.map(transaction => (
      <Transaction key={transaction.senderAddress + transaction.recipientAddress} transaction={transaction} />
    ));
    return (
      <div className="table-section">
        <div className="title">
          <h3>Last transactions</h3>
        </div>
        <div className="list">
          <TransactionsHeader />
          {transactionList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions, wallet }: IStoreState) => ({ transactions, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address))
});

export const AllTransactions = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AllTransactionsComponent);
