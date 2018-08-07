import * as React from 'react';
import { Link } from 'react-router-dom';
import { Password } from '../components-ui/Password';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';

interface IStoreState {
  key: string;
}

export class WalletLoginByPrivKey extends React.Component<{}, IStoreState> {
  public state = {
    key: ''
  };

  public onKeyChange = (e: React.SyntheticEvent<HTMLInputElement>) => this.setState({ key: e.currentTarget.value });

  public render() {
    const { key } = this.state;

    return (
      <section>
        <div className="form-content">
          <div className="crumbs">
            <Link to="/login">Select type of login</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/login">
              <img src={arrow} alt="<" />
            </Link>
            <h2>Enter private key</h2>
          </div>
          <form action="#">
            <div className="input input-enter-key">
              <p className="required">private key</p>
              <Password password={key} onChange={this.onKeyChange} />
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
