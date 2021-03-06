import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getTransactions, createRecallVoteTransaction } from '../actions/transactions';
import {ICastedVotesDelegate, IDelegate, IList, IStoreState, IWallet} from '../configureStore';
import { Delegate } from './Delegate';
import { CastedVotesDelegate } from './CastedVotesDelegate';
import { DelegatesHeader } from './DelegatesHeader';
import { CastedVotesDelegateHeader } from './CastedVotesDelegateHeader';
import {DelegateTableTabs} from './DelegateTableTabs';
import {IRouterProps} from "../index";
import {withRouter} from "react-router";
import {InfiniteScrollComponent} from "./InfiniteScroll";
import {appendToDelegates, getDelegates} from "../actions/delegates";
import { getCastedVotesDelegates } from '../actions/castedVotesDelegates';
import { RecallConfirmPopup } from './RecallConfirmPopup';
import {parseApiError} from "../utils/parseApiError";
import {ErrorPopup} from "./ErrorPopup";
import {RecallVoteSuccess} from "./RecallVoteSuccess";

interface IStoreStateProps {
  wallet: IWallet | null;
  delegates: IList<IDelegate>;
  castedVotesDelegates: ICastedVotesDelegate;
  balance: string;
}

interface IDispatchProps {
  getCastedVotesDelegates(address: string): void;
  getTransactions(address: string): void;
  getDelegates(): void;
  appendToDelegates(): void;
  createRecallVoteTransaction({fee, delegate}: {fee: number, delegate: string}): Promise<void>;
}

type IProps = IStoreStateProps & IDispatchProps & IRouterProps;

interface IState {
  isAllDelegates: boolean
  isShowConfirm: boolean
  recallFee: number
  recallDelegateKey: string
  isShowError: boolean
  isShowSuccess: boolean
  errorPopupMessage: string
};

export class AllDelegatesComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      isAllDelegates: true,
      isShowConfirm: false,
      recallFee: 0,
      recallDelegateKey: '',
      isShowError: false,
      isShowSuccess: false,
      errorPopupMessage: ''
    }
  }
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getTransactions(wallet.address);
      this.props.getCastedVotesDelegates(wallet.address);
    }
    this.props.getDelegates();
  }
  public onAllDelegatesTabClick = (value: boolean) => {
    this.setState({isAllDelegates: value})
  }

  public onShowConfirm = ({delegateKey, fee}: {delegateKey: string, fee: number}) =>
    this.setState({ isShowConfirm: true, recallDelegateKey: delegateKey, recallFee: fee });

  public onCloseConfirm = () => this.setState({ isShowConfirm: false, recallDelegateKey: '' });
  public onCloseError = () => this.setState({ isShowError: false });
  public onCloseSuccess = () => this.setState({ isShowSuccess: false });

  public recallVoteDelegate = async (e?: MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const {recallFee, recallDelegateKey} = this.state;
    try {
      await this.props.createRecallVoteTransaction({fee: recallFee, delegate: recallDelegateKey});
      if (this.props.wallet) {
        this.props.getCastedVotesDelegates(this.props.wallet.address);
      }
      this.setState({ isShowConfirm: false, isShowSuccess: true });
    } catch (e) {
      console.error(e);
      const { message } = parseApiError(e);
      this.setState({ isShowConfirm: false, isShowError: true, errorPopupMessage: message, recallDelegateKey: '', recallFee: 0 });
      throw e;
    }
  }

  public onLoadMore = () => {
    this.props.appendToDelegates();
  }

  public renderDelegates = () => {
    const delegates: IList<IDelegate> = this.props.delegates;
    const castedVotesDelegate: ICastedVotesDelegate = this.props.castedVotesDelegates;
    const isRecallButtonDisabled = +this.props.balance < 1;

    if (this.state.isAllDelegates) {
      return (
        <div className="list corner-fix">
          <DelegatesHeader />
          <InfiniteScrollComponent data={delegates} onLoadMore={this.onLoadMore}>
            {delegates.list && delegates.list.map((delegate, index) => {
              const isVoted = castedVotesDelegate && castedVotesDelegate.delegateKey === delegate.delegateKey;
              return <Delegate key={delegate.delegateKey} isVoted={isVoted} delegate={delegate} rank={index + 1}/>
            })}
          </InfiniteScrollComponent>
        </div>
      )
    } else {

      return (
        <div className="list list-votes corner-fix">
          <CastedVotesDelegateHeader />
            <CastedVotesDelegate delegate={castedVotesDelegate} recallVoteDelegate={this.onShowConfirm}
                                 isRecallButtonDisabled={isRecallButtonDisabled || (castedVotesDelegate && this.state.recallDelegateKey === castedVotesDelegate.delegateKey)}/>
        </div>
      )
    }
  }

  public render() {
    const {isShowConfirm, recallDelegateKey, recallFee, isAllDelegates, isShowError, errorPopupMessage, isShowSuccess} = this.state;
    const delegates: IList<IDelegate> = this.props.delegates;

    return (
      <div className={`table-section ${(isShowConfirm || isShowError || isShowSuccess) && 'z-index-3'}`}>
        <div className="title">
          <h3>delegates</h3>
        </div>
        <DelegateTableTabs delegatesCount={delegates.list.length} isAllDelegates={isAllDelegates}
                           onAllDelegatesTabClick={this.onAllDelegatesTabClick}/>

        {this.renderDelegates()}
        <RecallConfirmPopup
          isVisible={isShowConfirm}
          delegate={recallDelegateKey}
          fee={recallFee}
          onSubmit={this.recallVoteDelegate}
          onClose={this.onCloseConfirm}
        />
        <ErrorPopup isVisible={isShowError} errorMessage={errorPopupMessage} onClose={this.onCloseError}/>
        <RecallVoteSuccess isVisible={isShowSuccess} onClose={this.onCloseSuccess}/>
      </div>
    );
  }
}

const mapStateToProps = ({ delegates, wallet, castedVotesDelegates, balance }: IStoreState) => ({ delegates, wallet, castedVotesDelegates, balance });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
  appendToDelegates: () => dispatch(appendToDelegates()),
  getDelegates: () => dispatch(getDelegates()),
  getTransactions: (address: string) => dispatch(getTransactions(address)),
  createRecallVoteTransaction: ({fee, delegate}: {fee: number, delegate: string}) => dispatch(createRecallVoteTransaction({fee, delegate})),
  getCastedVotesDelegates: (address: string) => dispatch(getCastedVotesDelegates(address))
});

export const AllDelegates = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllDelegatesComponent));
