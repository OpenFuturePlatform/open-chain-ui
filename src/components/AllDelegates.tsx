import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions } from '../actions/transactions';
import { IDelegate, IList, IStoreState, IWallet } from '../configureStore';
import { Delegate } from './Delegate';
import { DelegatesHeader } from './DelegatesHeader';

interface IStoreStateProps {
  wallet: IWallet | null;
  delegates: IList<IDelegate>;
}

interface IDispatchProps {
  getTransactions(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

export class AllDelegatesComponent extends React.Component<IProps> {
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
    }
  }

  public render() {
    const delegates: IList<IDelegate> = this.props.delegates;
    const delegateList = delegates.list.map(delegate => <Delegate key={delegate.id} delegate={delegate} />);
    return (
      <div className="table-section">
        <div className="title">
          <h3>delegates</h3>
        </div>
        <div className="list">
          <DelegatesHeader />
          {delegateList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ delegates, wallet }: IStoreState) => ({ delegates, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address))
});

export const AllDelegates = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AllDelegatesComponent);
