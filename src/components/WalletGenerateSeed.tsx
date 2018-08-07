import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { generateWallet } from '../actions/wallet';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import info from '../img/info.svg';

interface IDispatchProps {
  generateWallet: () => void;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

export class WalletGenerateSeedComponent extends React.Component<IProps> {
  public handleOnGenerate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await this.props.generateWallet();
    this.props.history.push('/new/seed-phrase');
  };

  public render() {
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
            <h2>Create new wallet</h2>
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

const mapStateToProps = (state: IStoreState) => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  generateWallet: () => dispatch(generateWallet())
});

export const WalletGenerateSeed = connect<object, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WalletGenerateSeedComponent));
