import * as React from 'react';
import success from '../img/success.svg';
import { PopupBackgroundArea } from './PopupBackgroundArea';

interface IProps {
  children: string;
  onSubmit(): void;
}

export class SuccessPopup extends React.Component<IProps> {
  public onSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    this.props.onSubmit();
  };

  public render() {
    return (
      <PopupBackgroundArea onClick={this.onSubmit}>
        <form className="popup success" onSubmit={this.onSubmit}>
          <img src={success} alt="ok" />
          <h2>{this.props.children}</h2>
          <button className="button mini">
            <div />
            <span>Done</span>
          </button>
        </form>
      </PopupBackgroundArea>
    );
  }
}
