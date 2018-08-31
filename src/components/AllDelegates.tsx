import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions, createRecallVoteTransaction } from '../actions/transactions';
import { IDelegate, IList, IStoreState, IWallet } from '../configureStore';
import { Delegate } from './Delegate';
import { CastedVotesDelegate } from './CastedVotesDelegate';
import { DelegatesHeader } from './DelegatesHeader';
import { CastedVotesDelegateHeader } from './CastedVotesDelegateHeader';
import {DelegateTableTabs} from './DelegateTableTabs';
import {IRouterProps} from "../index";
import {withRouter} from "react-router";

interface IStoreStateProps {
  wallet: IWallet | null;
  delegates: IList<IDelegate>;
  castedVotesDelegates: IList<IDelegate>;
}

interface IDispatchProps {
  getTransactions(address: string): void;
  createRecallVoteTransaction({fee, delegate}: {fee: number, delegate: string}): Promise<void>;
}

type IProps = IStoreStateProps & IDispatchProps & IRouterProps;

interface IState {
  isAllDelegates: boolean
};

export class AllDelegatesComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      isAllDelegates: true
    }
  }
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
    }
  }
  public onAllDelegatesTabClick = (value: boolean) => {
    this.setState({isAllDelegates: value})
  };

  public recallVoteDelegate = async ({nodeId, fee}: {nodeId: string, fee: number}) => {
    try {
      await this.props.createRecallVoteTransaction({fee, delegate: nodeId});
    } catch (e) {
      console.error(e)
    }
  }

  public renderDelegateList = () => {
    const delegates: IList<IDelegate> = this.props.delegates;
    const castedVotesDelegates: IList<IDelegate> = this.props.castedVotesDelegates;
    if (this.state.isAllDelegates) {
      return (
        <div className="list corner-fix">
          <DelegatesHeader />
          {delegates.list && delegates.list.map(delegate => {
            const isVoted = !!castedVotesDelegates.list.find(i => delegate.publicKey === i.publicKey);
            return <Delegate key={delegate.publicKey} isVoted={isVoted} delegate={delegate} />
          })}
        </div>
      )
    } else {

      return (
        <div className="list list-votes corner-fix">
          <CastedVotesDelegateHeader />
          {castedVotesDelegates.list &&
          castedVotesDelegates.list.map(delegate => <CastedVotesDelegate key={delegate.publicKey}
                                                                         delegate={delegate}
                                                                         recallVoteDelegate={this.recallVoteDelegate}/>)}
        </div>
      )
    }
  }

  public render() {
    const delegates: IList<IDelegate> = this.props.delegates;
    const castedVotesDelegates: IList<IDelegate> = this.props.castedVotesDelegates;

    return (
      <div className="table-section">
        <div className="title">
          <h3>delegates</h3>
        </div>
        <DelegateTableTabs delegatesCount={delegates.list.length} isAllDelegates={this.state.isAllDelegates}
                           onAllDelegatesTabClick={this.onAllDelegatesTabClick} castedVotesDelegatesCount={castedVotesDelegates.list.length}/>

        {this.renderDelegateList()}
      </div>
    );
  }
}

const mapStateToProps = ({ delegates, wallet, castedVotesDelegates }: IStoreState) => ({ delegates, wallet, castedVotesDelegates });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  getTransactions: (address: string) => dispatch(getTransactions(address)),
  createRecallVoteTransaction: ({fee, delegate}: {fee: number, delegate: string}) => dispatch(createRecallVoteTransaction({fee, delegate}))
});

export const AllDelegates = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllDelegatesComponent));
