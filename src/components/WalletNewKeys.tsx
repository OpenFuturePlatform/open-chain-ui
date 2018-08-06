import * as React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import { IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import infoGray from '../img/info-gray.svg';

interface IStoreStateProps {
  wallet: IWallet;
}

export class WalletNewKeys extends React.Component<IStoreStateProps, object> {
  public render() {
    const { address, keys } = this.props.wallet;
    const { privateKey, publicKey } = keys;

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/login">Select type of login</Link>
            <img src={crumb} alt=">" />

            <Link to="/new">Create a new wallet</Link>
            <img src={crumb} alt=">" />

            <Link to="/new/seed-phrase">Seed phrase</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/new/seed-phrase">
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
              <Link to="/new/create" className="button">
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
