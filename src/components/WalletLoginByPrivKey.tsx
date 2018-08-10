import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IThunkDispatch } from '../actions';
import { getWalletByPrivateKey } from '../actions/wallet';
import { Password } from '../components-ui/Password';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import { parseApiError } from '../utils/parseApiError';

interface IDispatchProps {
  getWalletByPrivateKey(privateKey: string): Promise<void>;
}

interface IState {
  key: string;
  keyError: string;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

export class WalletLoginByPrivKeyComponent extends React.Component<IProps, IState> {
  public state = {
    key: '',
    keyError: ''
  };

  public onKeyChange = (e: React.SyntheticEvent<HTMLInputElement>) => this.setState({ key: e.currentTarget.value });

  public isSubmitDisabled = () => !this.state.key;

  public getKeyError = (key: string) => {
    if (key.length !== 69) {
      return 'Private Key needs to include 69 symbols';
    }
    const spaces = key.split('').filter(it => it === ' ');
    if (spaces.length === 69) {
      return 'Invalid Private Key';
    }
    return '';
  };

  public onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { key } = this.state;
    const keyError = this.getKeyError(key);
    if (keyError) {
      return this.setState({ keyError });
    }
    try {
      await this.props.getWalletByPrivateKey(key);
      this.props.history.push('/wallet');
    } catch (e) {
      this.setState({ keyError: parseApiError(e) });
    }
  };

  public render() {
    const { key, keyError } = this.state;
    const isConfirmDisabled = this.isSubmitDisabled();

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
          <form onSubmit={this.onSubmit}>
            <div className={`input input-enter-key ${keyError && 'invalid'}`}>
              <p className="required">private key</p>
              <span className="error">{keyError}</span>
              <Password password={key} onChange={this.onKeyChange} />
            </div>
            <button className={`button btn-enter-key ${isConfirmDisabled && 'disable'}`}>
              <div />
              <span>Confirm</span>
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  getWalletByPrivateKey: (privateKey: string) => dispatch(getWalletByPrivateKey(privateKey))
});

export const WalletLoginByPrivKey = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WalletLoginByPrivKeyComponent);
