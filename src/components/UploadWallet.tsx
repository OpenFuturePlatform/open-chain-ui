import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { getVersion } from '../actions/version';
import { setWallet } from '../actions/wallet';
import { Password } from '../components-ui/Password';
import { IStoreState, IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import { decryptWallet, IEncWallet } from '../utils/crypto';
import { UploadEncWalletInput } from './UploadEncWalletInput';

interface IDispatchProps {
  getVersion(): void;
  setWallet(wallet: IWallet): void;
}

interface IState {
  encWallet: IEncWallet | null;
  fileError: string;
  password: string;
  passwordError: string;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

export class UploadWalletComponent extends React.Component<IProps, IState> {
  public state = {
    encWallet: null,
    fileError: '',
    password: '',
    passwordError: ''
  };

  public onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  public onSelectEncWallet = (encWallet: IEncWallet) => this.setState({ encWallet });

  public onFileError = (message: string) => this.setState({ fileError: message, passwordError: '' });

  public handleOnConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { encWallet, password } = this.state;
    if (!encWallet) {
      return;
    }
    try {
      const wallet = await decryptWallet(encWallet, password);
      this.props.setWallet(wallet);
      this.props.history.push('/wallet');
    } catch (e) {
      this.setState({ passwordError: 'Invalid password or wallet file' });
    }
  };

  public render() {
    const { encWallet, password, passwordError, fileError } = this.state;
    const isConfirmDisabled = !password || !encWallet || fileError;

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
            <h2>Upload file</h2>
          </div>
          <form className="form-upload-file">
            <div className="input">
              <p className="required">Select file</p>
              <span className="error">{fileError}</span>
              <UploadEncWalletInput onSelect={this.onSelectEncWallet} onFileError={this.onFileError} />
            </div>
            <div className={`input ${passwordError && 'invalid'}`}>
              <p className="required">Enter password</p>
              <span className="error">{passwordError}</span>
              <Password password={password} onChange={this.onPasswordChange} />
            </div>
            <button onClick={this.handleOnConfirm} className={`button ${isConfirmDisabled && 'disable'}`}>
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
  getVersion: () => dispatch(getVersion()),
  setWallet: (wallet: IWallet) => dispatch(setWallet(wallet))
});

export const UploadWallet = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UploadWalletComponent));
