import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IThunkDispatch } from '../actions';
import { getCastedVotesDelegates } from '../actions/castedVotesDelegates';
import { getDelegates } from '../actions/delegates';
import {IDelegate, IList, IStoreState, IWallet} from '../configureStore';

interface IStoreStateProps {
  delegates: IList<IDelegate>;
  wallet: IWallet | null
}

interface IDispatchProps {
  getCastedVotesDelegates(address: string): void;
  getDelegates(): void;
}

type IProps = IStoreStateProps & IDispatchProps;

class DelegatesComponent extends React.Component<IProps> {
  public componentDidMount() {
    this.props.getDelegates();
    if (this.props.wallet) {
      this.props.getCastedVotesDelegates(this.props.wallet.address);
    }
  }

  public renderDelegates = (delegates: IDelegate[]) =>
    delegates.map(delegate => (
      <div key={delegate.publicKey} className="delegate">
        <p className="rank">{delegate.rating}</p>
        <p className="address">{delegate.address}</p>
        <p className="amount">{delegate.votesCount}</p>
      </div>
    ));

  public render() {
    const { delegates } = this.props;
    return (
      <div className="delegates-list">
        <div className="title">
          <h3>delegates</h3>
          <Link to="/wallet/delegates" className="button small">
            <div />
            <span>Vote</span>
          </Link>
        </div>
        <div className="list">
          <div className="head">
            <p className="rank">Rank</p>
            <p className="address">Address</p>
            <p className="amount">Amount of votes</p>
          </div>
          {this.renderDelegates(delegates.list.slice(0, 10))}
          <Link to="/wallet/delegates" className="all">
            View all delegates <span>{delegates.totalCount}</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ delegates, wallet }: IStoreState) => ({ delegates, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  getDelegates: () => dispatch(getDelegates()),
  getCastedVotesDelegates: (address: string) => dispatch(getCastedVotesDelegates(address))
});

export const Delegates = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(DelegatesComponent);
