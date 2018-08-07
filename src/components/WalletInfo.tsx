import * as React from 'react';
import { connect } from 'react-redux';
import { IThunkDispatch } from '../actions';
import { getBalance } from '../actions/balance';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import { IStoreState, IWallet } from '../configureStore';

interface IStoreStateProps {
  wallet: IWallet | null;
  balance: string;
}

interface IDispatchProps {
  getBalance(address: string): void;
}

type IProps = IStoreStateProps & IDispatchProps;

export class WalletInfoComponent extends React.Component<IProps> {
  public componentDidMount() {
    const { wallet } = this.props;
    if (wallet) {
      this.props.getBalance(wallet.address);
    }
  }

  public render() {
    const { wallet, balance } = this.props;
    const address = wallet ? wallet.address : '';

    return (
      <div className="wallet-info">
        <p className="title">Wallet balance</p>
        <p className="balance">
          {balance} <span>open</span>
        </p>
        <p className="conversions" />

        <p className="title">
          Wallet address <CopyToClipboard value={address} />
        </p>
        <p className="key">{address}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet, balance }: IStoreState) => ({ wallet, balance });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  getBalance: (address: string) => dispatch(getBalance(address))
});

export const WalletInfo = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WalletInfoComponent);
