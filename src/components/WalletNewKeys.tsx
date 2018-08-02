import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import { IStoreState, IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import infoGray from '../img/info-gray.svg';

interface IStoreStateProps {
  wallet: IWallet | null;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IStoreStateProps & IRouterProps;

interface IState {
  isConfirmDisabled: boolean;
}

export class WalletNewKeysComponent extends React.Component<IProps, IState> {
  public state = {
    isConfirmDisabled: true
  };

  public onExportHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ isConfirmDisabled: false });
  };

  public onConfirmHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  public render() {
    const privateKey = 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B3';
    const publicKey = 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B3';
    const address = 'FF7508C54D3EF2141D05F7EB1A0CC719692E8A3A189B1342354223';

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
            <Link to="/wallet/generate-seed-phrase">
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
              <a className="button white">
                <div />
                <span>
                  Export<span>.txt</span>
                </span>
                <input type="file" />
              </a>
              <a href="#" className="button">
                <div />
                <span>Confirm</span>
              </a>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }: IStoreState) => ({ wallet });

export const WalletNewKeys = connect<IStoreStateProps, {}, {}>(mapStateToProps)(
  withRouter<IRouterProps>(WalletNewKeysComponent)
);
