import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { getVersion } from '../actions/version';
import { generateWallet } from '../actions/wallet';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import info from '../img/info.svg';
import { walletSelector } from '../reducers';

interface IProps {
  history: History;
  version: string;
  generateWallet: () => void;
  getVersion: () => void;
}

export class WalletGenerateSeedComponent extends React.Component<IProps> {
  public handleOnGenerate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.getVersion();
  };

  public render() {
    return (
      <section>
        {this.props.version}
        <div className="form-content">
          <div className="crumbs">
            <Link to="/wallet/login-type">Select type of login</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/wallet/login-type">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Create a new wallet</h2>
          </div>
          <form>
            <h2 className="generate">Generate seed phrase</h2>
            <a className="info-link" href="#">
              <img src={info} alt="?" />
              <span>What is Seed Phrase?</span>
            </a>
            <button className="button" onClick={this.handleOnGenerate}>
              <div />
              <span>Generate</span>
            </button>
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
  version: state.version,
  wallet: walletSelector(state)
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  generateWallet: () => dispatch(generateWallet()),
  getVersion: () => dispatch(getVersion())
});

export const WalletGenerateSeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletGenerateSeedComponent);
