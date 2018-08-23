import * as React from 'react';
import { AllDelegates } from '../components/AllDelegates';

export class WalletDelegates extends React.Component<object> {
  public render() {
    return (
      <React.Fragment>
        <div className="left-section">{/* <TransactionCreate /> */}</div>
        <AllDelegates />
      </React.Fragment>
    );
  }
}
