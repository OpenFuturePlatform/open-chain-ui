import * as React from 'react';
import { copy2Clipboard } from '../utils/copy2Clipboard';

interface IProps {
  value: string;
}

interface IState {
  copied: boolean;
}

export class CopyToClipboard extends React.Component<IProps, IState> {
  public state = {
    copied: false
  };

  public onCopyHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { value } = this.props;
    const copied = copy2Clipboard(value);
    this.setState({ copied });
    setTimeout(() => this.setState({ copied: false }), 4000);
  };

  public render() {
    const { copied } = this.state;
    const copyButtonText = copied ? 'Copied' : 'Copy to clipboard';

    return (
      <button className="copy" onClick={this.onCopyHandler}>
        {copyButtonText}
      </button>
    );
  }
}
