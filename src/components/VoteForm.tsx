import * as React from 'react';
import { DelegateTabs } from './DelegateTabs';

export class VoteForm extends React.Component<{}> {
  public render() {
    const delegateError = 'Delegate Error';
    const feeError = 'Fee Error';

    return (
      <div className="left-section">
        <form className="delegate-form">
          <DelegateTabs />
          <div className="vote-section">
            <h2>Vote</h2>
            <div className={`input ${delegateError && 'invalid'}`}>
              <p className="required">Delegate's address</p>
              <span className="error">{delegateError}</span>
              <input className="" type="text" placeholder="Wallet" required={true} />
            </div>
            <div className={`input ${feeError && 'invalid'}`}>
              <p className="required">Fee Amount</p>
              <span className="error">{feeError}</span>
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
