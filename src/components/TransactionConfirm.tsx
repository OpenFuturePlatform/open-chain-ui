import * as React from 'react';
import { SuccessPopup } from '../components-ui/SuccessPopup';
import { ITransactionCandidate } from '../configureStore';
import { TransactionPreviewPopup } from './TransactionPreviewPopup';

interface IProps {
  address: string;
  transaction: ITransactionCandidate;
  isConfirmVisible: boolean;
  onConfirm(): Promise<void>;
  onClose(): void;
}

interface IState {
  isSuccessVisible: boolean;
}

export class TransactionConfirm extends React.Component<IProps, IState> {
  public state = {
    isSuccessVisible: false
  };

  private background: React.RefObject<HTMLDivElement> = React.createRef();

  public onClose = () => this.props.onClose();
  public onToggleSuccess = () =>
    this.setState((prevState: IState) => ({ isSuccessVisible: !prevState.isSuccessVisible }));

  public onBackground = (e: React.MouseEvent) => {
    const target = e.target;
    const background = this.background.current;
    if (target === background) {
      this.onClose();
    }
  };

  public onConfirm = async () => {
    try {
      await this.props.onConfirm();
      this.onToggleSuccess();
    } catch (e) {
      console.warn(e);
    } finally {
      this.onClose();
    }
  };

  public render() {
    const { isConfirmVisible, transaction, address } = this.props;
    const { isSuccessVisible } = this.state;

    return (
      <React.Fragment>
        {isConfirmVisible && (
          <TransactionPreviewPopup
            address={address}
            transaction={transaction}
            onClose={this.onClose}
            onConfirm={this.onConfirm}
          />
        )}
        {isSuccessVisible && <SuccessPopup onSubmit={this.onToggleSuccess}>Transaction completed!</SuccessPopup>}
      </React.Fragment>
    );
  }
}
