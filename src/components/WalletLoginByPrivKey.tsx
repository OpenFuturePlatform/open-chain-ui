import * as React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';

interface IStoreState {
  isKeyHidden: boolean;
  key: string;
}

export class WalletLoginByPrivKey extends React.Component<{}, IStoreState> {
  public state = {
    isKeyHidden: true,
    key: ''
  };

  public onShowKey = () => this.setState(prevState => ({ isKeyHidden: !prevState.isKeyHidden }));

  public onKeyChange = (e: { target: HTMLInputElement }) => this.setState({ key: e.target.value });

  public render() {
    const { isKeyHidden, key } = this.state;
    const inputType = this.state.isKeyHidden ? 'password' : 'text';

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/wallet/login-type">Select type of login</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/wallet/login-type">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Enter private key</h2>
          </div>
          <form action="#">
            <div className="input input-enter-key">
              <p className="required">private key</p>
              <input type={inputType} placeholder="Private Key" value={key} onChange={this.onKeyChange} />
              <label htmlFor="eye">
                <input id="eye" type="checkbox" checked={!isKeyHidden} onChange={this.onShowKey} />
                <div className="eye" />
              </label>
            </div>
            <button className="button disable btn-enter-key">
              <div />
              <span>Confirm</span>
            </button>
          </form>
        </div>
      </section>
    );
  }
}
