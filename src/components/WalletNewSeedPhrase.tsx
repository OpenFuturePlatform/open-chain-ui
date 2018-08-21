import * as React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from '../components-ui/CopyToClipboard';
import InfoPopup from '../components-ui/InfoPopup';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import { download } from '../utils/download';

interface IProps {
  address: string;
  seed: string;
}

interface IState {
  isConfirmDisabled: boolean;
  isInfoShown: boolean;
}

export class WalletNewSeed extends React.Component<IProps, IState> {
  public state = {
    isConfirmDisabled: true,
    isInfoShown: false
  };

  public onShowInfo = () => this.setState({ isInfoShown: true });
  public onHideInfo = () => this.setState({ isInfoShown: false });

  public onExportHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { address, seed } = this.props;
    this.setState({ isConfirmDisabled: false });
    download(`${address}-seed-phrase.txt`, seed);
  };

  public render() {
    const { seed } = this.props;
    const { isConfirmDisabled, isInfoShown } = this.state;

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/login">Select type of login</Link>
            <img src={crumb} alt=">" />

            <Link to="/new">Create new wallet</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/new">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Seed phrase</h2>
          </div>
          <form className="form-seed-pharse">
            <div className="input">
              <p className="required">
                Seed phrase <span>12 words</span>
                <CopyToClipboard value={seed} />
              </p>
              <textarea className="disable" readOnly={true} value={seed} />
            </div>
            <div className="button-area">
              <a className={`button ${!isConfirmDisabled && 'white'}`} onClick={this.onExportHandler}>
                <div />
                <span>
                  Export
                  <span>.txt</span>
                </span>
              </a>
              <Link to="/new/keys" className={`button ${isConfirmDisabled && 'disable'}`}>
                <div />
                <span>Confirm</span>
              </Link>
            </div>
            <div className="disclaimer">
              <img src={danger} alt="!" />
              <span>Disclaimer</span>
              <span className="link" onClick={this.onShowInfo}>
                Read
              </span>
            </div>
          </form>
        </div>
        {isInfoShown && <InfoPopup closePopup={this.onHideInfo} />}
      </section>
    );
  }
}
