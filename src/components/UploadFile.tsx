import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { getVersion } from '../actions/version';
import { setWallet } from '../actions/wallet';
import { Password } from '../components-ui/Password';
import { IFile, SelectFile } from '../components-ui/SelectFile';
import { IStoreState, IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import { decryptWallet, IEncWallet } from '../utils/crypto';

interface IDispatchProps {
  getVersion(): void;
  setWallet(wallet: IWallet): void;
}

interface IState {
  file: IFile;
  encWallet: IEncWallet | null;
  password: string;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

export class UploadFileComponent extends React.Component<IProps, IState> {
  public state = {
    encWallet: null,
    file: null,
    password: ''
  };

  public onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  public onSelectFile = (file: File | null) => {
    this.setState({ file });
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const encWallet: IEncWallet = JSON.parse(reader.result);
        this.setState({ encWallet });
      } catch (e) {
        throw e;
      }
    };
    reader.readAsText(file);
  };

  public handleOnConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { encWallet, password } = this.state;
    if (!encWallet) {
      return;
    }
    const wallet = await decryptWallet(encWallet, password);
    this.props.setWallet(wallet);
    // this.props.history.push('/new/seed-phrase');
  };

  public render() {
    const { file, password } = this.state;

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
              <SelectFile file={file} onSelect={this.onSelectFile} />
            </div>
            <div className="input">
              <p className="required">Enter password</p>
              <Password password={password} onChange={this.onPasswordChange} />
            </div>
            <button onClick={this.handleOnConfirm} className="button">
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

export const UploadFile = connect<{}, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UploadFileComponent));
