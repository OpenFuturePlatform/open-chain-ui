import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { getVersion } from '../actions/version';
import { generateWallet } from '../actions/wallet';
import { IStoreState, IWallet } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import info from '../img/info.svg';

interface IStoreStateProps {
  version: string;
  wallet: IWallet | null;
}

interface IDispatchProps {
  generateWallet: () => void;
  getVersion: () => void;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IStoreStateProps & IDispatchProps & IRouterProps;

export class WalletGenerateSeedComponent extends React.Component<IProps> {
  public handleOnGenerate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await this.props.generateWallet();
    this.props.history.push('/new/seed-phrase');
  };

  public render() {
    return (
      <section>
        {this.props.version}
        <div className="form-content">
          <div className="crumbs">
            <Link to="/login">Select type of login</Link>
            <img src={crumb} alt=">" />
          </div>
          <div className="name">
            <Link to="/login">
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

const mapStateToProps = ({ version, wallet }: IStoreState) => ({ version, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  generateWallet: () => dispatch(generateWallet()),
  getVersion: () => dispatch(getVersion())
});

export const WalletGenerateSeed = connect<IStoreStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WalletGenerateSeedComponent));
