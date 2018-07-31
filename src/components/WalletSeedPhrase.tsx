import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import { walletSelector } from '../reducers';

interface IProps {
  history: History;
}

interface IState {
  isConfirmDisabled: boolean;
}

export class WalletNewSeedComponent extends React.Component<IProps, IState> {
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
    const { isConfirmDisabled } = this.state;

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/wallet/login-type">Select type of login</Link>
            <img src={crumb} alt=">" />

            <Link to="/wallet/generate-seed-phrase">Create a new wallet</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/wallet/generate-seed-phrase">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Seed phrase</h2>
          </div>
          <form className="form-seed-pharse">
            <div className="input">
              <p className="required">
                Seed phrase <span>12 words</span>
                <a className="copy" href="#">
                  Copy to clipboard
                </a>
              </p>
              <textarea className="disable" readOnly={true}>
                Looping videfo iffsws fdsfa shorfgt vi2deo thwat plaeys oveer anwwed oveer again
              </textarea>
            </div>
            <div className="button-area">
              <a className="button white" onClick={this.onExportHandler}>
                <div />
                <span>
                  Export<span>.txt</span>
                </span>
              </a>
              <button onClick={this.onConfirmHandler} className={`button ${isConfirmDisabled && 'disable'}`}>
                <div />
                <span>Confirm</span>
              </button>
            </div>
            <div className="disclaimer">
              <img src={danger} alt="!" />
              <span>Disclaimer text</span>
              <a href="#">Read</a>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({
  wallet: walletSelector(state)
});

export const WalletNewSeed = connect(mapStateToProps)(WalletNewSeedComponent);
