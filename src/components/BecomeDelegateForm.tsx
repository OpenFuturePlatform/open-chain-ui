import * as React from 'react';
import { DelegateTabs } from './DelegateTabs';

export class BecomeDelegateForm extends React.Component<{}> {
  public render() {
    return (
      <div className="left-section">
        <form className="delegate-form">
          <DelegateTabs />
          Become Delegate Functionality
        </form>
      </div>
    );
  }
}
