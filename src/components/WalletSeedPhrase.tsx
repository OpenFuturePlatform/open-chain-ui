import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import { download } from '../utils/download';

interface IProps {
  seed: string;
  history: History;
}

interface IState {
  copied: boolean;
  isConfirmDisabled: boolean;
}

export class WalletNewSeedComponent extends React.Component<IProps, IState> {
  public state = {
    copied: false,
    isConfirmDisabled: true
  };

  private seedRef = React.createRef<HTMLTextAreaElement>();

  public onCopyHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (this.seedRef.current) {
      const copyValue = this.seedRef.current.value;
      const copied = copy2Clipboard(copyValue);
      this.setState({ copied });
      setTimeout(() => this.setState({ copied: false }), 4000);
    }
  };

  public onExportHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { seed } = this.props;
    this.setState({ isConfirmDisabled: false });
    download('seed-phrase.txt', seed);
  };

  public onConfirmHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  public render() {
    const { seed } = this.props;
    const { copied, isConfirmDisabled } = this.state;
    const copyButtonText = copied ? 'Copied' : 'Copy to clipboard';

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
                <button className="copy" onClick={this.onCopyHandler}>
                  {copyButtonText}
                </button>
              </p>
              <textarea ref={this.seedRef} className="disable" readOnly={true} value={seed} />
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

const mapStateToProps = ({ seed }: IStoreState) => ({ seed });

export const WalletNewSeed = connect(mapStateToProps)(WalletNewSeedComponent);
