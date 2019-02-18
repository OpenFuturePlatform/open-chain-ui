import * as React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import { IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';

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

            <Link to="/new">Create new wallet</Link>
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
                <div className="popover-area2">
                  <input type="checkbox" id="popover" />
                  <label htmlFor="popover">
                    <div className="close-wrapper" />
                  </label>
                  <div className="popover">
                    <h3>Public Key</h3>
                    <p>
                      You should only give this Extended Public Key (xPub) to those you trust. With this information,
                      they may be able to keep track of your payments, and may be able to disrupt your access to your
                      wallet.
                    </p>
                  </div>
                </div>
              </div>
              <div className="key">
                <span>{publicKey}</span>
                <CopyToClipboard value={publicKey} />
              </div>
            </div>
            <div className="key-area mgb54">
              <div className="title">
                <p>wallet address</p>
                <div className="popover-area2">
                  <input type="checkbox" id="popover2" />
                  <label htmlFor="popover2">
                    <div className="close-wrapper" />
                  </label>
                  <div className="popover">
                    <h3>Wallet Address</h3>
                    <p>Wallet addresses are what you share with others when you want to receive funds.</p>
                  </div>
                </div>
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
