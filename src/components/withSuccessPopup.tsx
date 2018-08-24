import * as React from 'react';
import { SuccessPopup } from '../components-ui/SuccessPopup';

interface IState {
  isShowSuccess: boolean;
}

export const withSuccessPopup = <P extends { onSubmit: () => Promise<void> }>(Component: React.ComponentType<P>) =>
  class WithSuccessPopup extends React.Component<P, IState> {
    public state = {
      isShowSuccess: false
    };

    public onSubmit = async (e?: MouseEvent | React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      await this.props.onSubmit();
      this.setState({ isShowSuccess: true });
    };

    public onHideSuccess = () => this.setState({ isShowSuccess: false });

    public render() {
      const { isShowSuccess } = this.state;
      return (
        <React.Fragment>
          <Component {...this.props} onSubmit={this.onSubmit} />
          {isShowSuccess && <SuccessPopup onSubmit={this.onHideSuccess}>Transaction sent!</SuccessPopup>}
        </React.Fragment>
      );
    }
  };
