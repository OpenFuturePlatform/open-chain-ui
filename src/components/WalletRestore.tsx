import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions/index';
import { restoreWallet } from '../actions/wallet';
import { IStoreState } from '../configureStore';
import arrow from '../img/arrow.svg';
import crumb from '../img/crumb.svg';

interface IDispatchProps {
  restoreWallet(seed: string): void;
}

interface IRouterProps extends RouteComponentProps<any> {}

type IProps = IDispatchProps & IRouterProps;

interface IState {
  seed: string;
}

export class WalletRestoreComponent extends React.Component<IProps, IState> {
  public state = {
    seed: ''
  };

  public onSeedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ seed: e.currentTarget.value });

  public handleOnConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { seed } = this.state;
    await this.props.restoreWallet(seed);
    this.props.history.push('/new/keys');
  };

  public render() {
    const { seed } = this.state;
    const isConfirmDisabled = !seed;

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
            <h2>Restore wallet</h2>
          </div>
          <form className="form-restore-wallet">
            <div className="input">
              <p className="required">
                Enter seed phrase <span>12 words</span>
              </p>
              <label htmlFor="eye" className="showing" />
              <textarea placeholder="Seed Phrase" value={seed} onChange={this.onSeedChange} />
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
  restoreWallet: (seed: string) => dispatch(restoreWallet(seed))
});

export const WalletRestore = connect<object, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WalletRestoreComponent));
