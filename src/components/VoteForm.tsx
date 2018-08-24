import * as React from 'react';
import { DelegateTabs } from './DelegateTabs';

export class VoteForm extends React.Component<{}> {
  public render() {
    return (
      <div className="left-section">
        <form className="delegate-form">
          <DelegateTabs />
          <div className="vote-section">
            <h2>Vote</h2>
            <div className="input">
              <p className="required">Delegate's address</p>
              <input className="" type="text" placeholder="Wallet" required={true} />
            </div>
            <div className="input">
              <p className="required">Fee Amount</p>
              <input className="" type="text" placeholder="Fee Amount" required={true} />
            </div>
            <button className="button mini">
              <div />
              <span>confirm</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
