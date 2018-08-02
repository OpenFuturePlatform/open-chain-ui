import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import { IStoreState, IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import infoGray from '../img/info-gray.svg';

interface IStoreStateProps {
  wallet: IWallet | null;
}

export class WalletNewKeysComponent extends React.Component<IStoreStateProps, object> {
  public render() {
    if (!this.props.wallet) {
      return null;
    }

    const { address, keys } = this.props.wallet;
    const { privateKey, publicKey } = keys;

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/wallet/login-type">Select type of login</Link>
            <img src={crumb} alt=">" />

            <Link to="/wallet/generate-seed-phrase">Create a new wallet</Link>
            <img src={crumb} alt=">" />

            <Link to="/wallet/new-seed-phrase">Seed phrase</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/wallet/new-seed-phrase">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Wallet data</h2>
          </div>

          <form className="form-walet-data">
            <div className="input">
              <p>
                Private key <CopyToClipboard value={privateKey} />
              </p>
              <input className="disable" type="text" required={true} readOnly={true} value={privateKey} />
            </div>
            <div className="key-area">
              <div className="title">
                <p>public key</p>
                <img src={infoGray} alt="?" />
              </div>
              <div className="key">
                <span>{publicKey}</span>
                <CopyToClipboard value={publicKey} />
              </div>
            </div>
            <div className="key-area mgb54">
              <div className="title">
                <p>wallet adress</p>
                <img src={infoGray} alt="?" />
              </div>
              <div className="key">
                <span>{address}</span>
                <CopyToClipboard value={address} />
              </div>
            </div>
            <div className="button-area ">
              <Link to="/wallet/create-password" className="button">
                <div />
                <span>Confirm</span>
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }: IStoreState) => ({ wallet });

export const WalletNewKeys = connect<IStoreStateProps, {}, {}>(mapStateToProps)(WalletNewKeysComponent);
