import * as React from 'react';
import { DelegateTabs } from './DelegateTabs';

export class VoteForm extends React.Component<{}> {
  public render() {
    return (
      <div className="left-section">
        <form className="delegate-form">
          <DelegateTabs />
          Vote Form
        </form>
      </div>
    );
  }
}
