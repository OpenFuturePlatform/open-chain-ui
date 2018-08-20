import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IRouterProps } from '..';
import { Password } from '../components-ui/Password';
import { IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import { encryptWallet, IEncWallet } from '../utils/crypto';
import { download } from '../utils/download';

interface IOwnProps {
  wallet: IWallet;
}

type IProps = IOwnProps & IRouterProps;

interface IState {
  password: string;
}

class WalletCreatePasswordComponent extends React.Component<IProps, IState> {
  public state = {
    password: ''
  };

  public onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  public isSubmitDisabled = () => this.state.password.length < 3;

  public onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.isSubmitDisabled()) {
      return;
    }
    const { wallet } = this.props;
    const { password } = this.state;
    const encWallet: IEncWallet = await encryptWallet(wallet, password);
    download(`${wallet.address}.json`, JSON.stringify(encWallet, null, 2));
    this.props.history.push('/new/complete');
  };

  public render() {
    const { password } = this.state;
    const isSubmitDisabled = this.isSubmitDisabled();

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

            <Link to="/new/keys">Wallet data</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/new/keys">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Create password</h2>
          </div>
          <form className="form-create-pass" onSubmit={this.onSubmit}>
            <div className="input">
              <p className="required">Create password</p>
              <Password password={password} onChange={this.onPasswordChange} />
            </div>
            <div className="button-area ">
              <button className={`button ${isSubmitDisabled && 'disable'}`}>
                <div />
                <span>Done</span>
              </button>
            </div>
            <div className="disclaimer">
              <img src={danger} alt="!" />
              <span>This password will be used to encrypt a file with your wallet data</span>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export const WalletCreatePassword = withRouter(WalletCreatePasswordComponent);
