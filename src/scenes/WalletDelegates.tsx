import * as React from 'react';
import { withRouter } from 'react-router';
import 'url-search-params-polyfill';
import { IRouterProps } from '..';
import { AllDelegates } from '../components/AllDelegates';
import { BecomeDelegateForm } from '../components/BecomeDelegateForm';
import { VoteForm } from '../components/VoteForm';

interface IState {
  becomeDelegateForm: boolean;
}

export class WalletDelegatesComponent extends React.Component<IRouterProps, IState> {
  public state = {
    becomeDelegateForm: false
  };

  public setBecomeDelegate = (e: React.FormEvent, state: boolean) => {
    e.preventDefault();
    this.setState({ becomeDelegateForm: state });
  };

  public showBecomeDelegate = (e: React.FormEvent) => this.setBecomeDelegate(e, true);
  public showVote = (e: React.FormEvent) => this.setBecomeDelegate(e, false);

  public render() {
    const params = new URLSearchParams(this.props.location.search);
    const becomeDelegateForm = !params.get('BaD');
    return (
      <React.Fragment>
        <AllDelegates />
        {becomeDelegateForm ? <VoteForm /> : <BecomeDelegateForm />}
      </React.Fragment>
    );
  }
}

export const WalletDelegates = withRouter(WalletDelegatesComponent);
