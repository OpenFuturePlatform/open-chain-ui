import * as React from 'react';
import { DelegateTabs } from './DelegateTabs';

export class BecomeDelegateForm extends React.Component<{}> {
  public render() {
    const feeError = 'Fee Error';

    return (
      <div className="left-section">
        <form className="delegate-form">
          <DelegateTabs />
          <div className="BaD-section">
            <h2>
              Become <br />a Delegate
            </h2>
            <div className="input">
              <p>FROM</p>
              <input
                className="disable"
                type="text"
                placeholder="Wallet Address"
                value="0XFF7508C54D3EF2141D05F7EB1A0CC719"
              />
            </div>
            <div className={`input ${feeError && 'invalid'}`}>
              <p className="required">Fee Amount</p>
              <span className="error">{feeError}</span>
              <input className="" type="text" placeholder="Fee Amount" required={true} />
            </div>
          </div>
          <button className="button mini">
            <div />
            <span>confirm</span>
          </button>
        </form>
      </div>
    );
  }
}
