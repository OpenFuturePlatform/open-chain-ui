import * as React from 'react';
import { Delegates } from '../components/Delegates';
import { LastTransactions } from '../components/LastTransactions';
import { WalletInfo } from '../components/WalletInfo';

export class WalletDashboard extends React.Component<object> {
  public render() {
    return (
      <React.Fragment>
        <div className="left-section">
          <WalletInfo />
          <Delegates />
        </div>
        <LastTransactions />
      </React.Fragment>
    );
  }
}
