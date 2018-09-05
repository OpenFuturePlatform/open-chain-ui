import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { generateWallet } from '../actions/wallet';
import InfoPopup from '../components-ui/InfoPopup';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';
import danger from '../img/danger.svg';
import info from '../img/info.svg';

interface IDispatchProps {
  generateWallet(): void;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

interface IState {
  isInfoShown: boolean;
}

export class WalletGenerateSeedComponent extends React.Component<IProps, IState> {
  public state = {
    isInfoShown: false
  };

  public onShowInfo = () => this.setState({ isInfoShown: true });
  public onHideInfo = () => this.setState({ isInfoShown: false });

  public handleOnGenerate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await this.props.generateWallet();
    this.props.history.push('/new/seed-phrase');
  };

  public render() {
    const { isInfoShown } = this.state;
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
            <div className="popover-area">
              <input type="checkbox" id="popover" />
              <label htmlFor="popover" className="info-link">
                <img src={info} alt="?" />
                <span>What is Seed Phrase?</span>
                <div className="close-wrapper" />
              </label>
              <div className="popover">
                <h3>Seed Phrase</h3>
                <p>
                  When you registering an account, you will be asked to save your secret phrase (Seed) which contains 12
                  English words with spaces between each word.<br/>Please make sure that you are using the correct seed
                  phrase, even a single space or character (even if you click on the Return/Enter button when you are
                  importing the seed phrase) will generate another Open address<br/>Also please make sure that the original
                  phrase doesn't have any white spaces or line breaks at the end of the line because wallet doesn't
                  recognise any additional non default symbols at the begin and at the end of the phrase.
                </p>
              </div>
            </div>
            <button className="button" onClick={this.handleOnGenerate}>
              <div />
              <span>Generate</span>
            </button>
            <div className="disclaimer">
              <img src={danger} alt="!" />
              <span>Disclaimer</span>
              <span className="link" onClick={this.onShowInfo}>
                Read
              </span>
            </div>
          </form>
        </div>
        {isInfoShown && <InfoPopup closePopup={this.onHideInfo} />}
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
