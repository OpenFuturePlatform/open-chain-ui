import * as React from 'react';
import { Link } from 'react-router-dom';
import { IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import { encryptWallet, IEncWallet } from '../utils/crypto';
import { download } from '../utils/download';

interface IProps {
  wallet: IWallet;
}

interface IState {
  isPasswordShown: boolean;
  password: string;
}

export class WalletCreatePassword extends React.Component<IProps, IState> {
  public state = {
    isPasswordShown: false,
    password: ''
  };

  public onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  public onShowPassword = () => this.setState(({ isPasswordShown }: IState) => ({ isPasswordShown: !isPasswordShown }));

  public onExportHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { wallet } = this.props;
    download(`${wallet.address}.json`, JSON.stringify(wallet));
  };

  public onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    const { wallet } = this.props;
    const { password } = this.state;
    e.preventDefault();
    const encWallet: IEncWallet = await encryptWallet(wallet, password);
    download(`${wallet.address}.json`, JSON.stringify(encWallet, null, 2));
  };

  public render() {
    const { isPasswordShown, password } = this.state;
    const inputType = isPasswordShown ? 'text' : 'password';
    const isSubmitDisabled = password.length < 3;

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

            <Link to="/new/new-keys">Wallet data</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/new/new-keys">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Create password</h2>
          </div>
          <form className="form-create-pass">
            <div className="input">
              <p className="required">Create password</p>
              <input
                type={inputType}
                placeholder="Password"
                value={password}
                required={true}
                onChange={this.onPasswordChange}
              />
              <label htmlFor="eye">
                <input id="eye" type="checkbox" checked={isPasswordShown} onChange={this.onShowPassword} />
                <div className="eye" />
              </label>
            </div>
            <div className="button-area ">
              <button onClick={this.onExportHandler} className="button white">
                <div />
                <span>
                  Export<span>.json</span>
                </span>
                <input type="file" />
              </button>
              <button className={`button ${isSubmitDisabled && 'disable'}`} onClick={this.onSubmit}>
                <div />
                <span>Done</span>
              </button>
            </div>
            <div className="disclaimer">
              <img src={danger} alt="!" />
              <span>The password is downloaded in .txt format automatically</span>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
