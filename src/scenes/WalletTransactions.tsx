import * as React from 'react';
import { AllTransactions } from '../components/AllTransactions';
import { TransactionCreate } from '../components/TransactionCreate';

export class WalletTransactions extends React.Component<object> {
  public render() {
    return (
      <React.Fragment>
        <AllTransactions />
        <div className="left-section">
          <TransactionCreate />
        </div>
      </React.Fragment>
    );
  }
}
