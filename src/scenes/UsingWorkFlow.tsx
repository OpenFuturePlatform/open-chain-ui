import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IRouterProps } from '..';
import { IThunkDispatch } from '../actions';
import { cleanWallet } from '../actions/wallet';
import { UploadWallet } from '../components/UploadWallet';
import { WalletLoginByPrivKey } from '../components/WalletLoginByPrivKey';
import { IStoreState, IWallet } from '../configureStore';
import { WalletDashboard } from './WalletDashboard';

interface IStoreStateProps {
  wallet: IWallet | null;
}

interface IDispatchProps {
  cleanWallet(): void;
}

type IProps = IRouterProps & IDispatchProps & IStoreStateProps;

class UsingWorkFlowComponent extends React.Component<IProps> {
  public componentDidMount() {
    this.props.cleanWallet();
  }

  public componentWillUnmount() {
    this.props.cleanWallet();
  }

  public render() {
    const { match, wallet } = this.props;
    const path = match.path;

    if (!wallet) {
      return (
        <Switch>
          <Route path="/upload" component={UploadWallet} />
          <Route path="/private-key" component={WalletLoginByPrivKey} />
          <Redirect to="/upload" />
        </Switch>
      );
    }

    return (
      <Switch>
        <Redirect exact={true} from={path} to="/upload" />
        <Route path="/upload" component={UploadWallet} />
        <Route path="/private-key" component={WalletLoginByPrivKey} />
        <Route path="/wallet" component={WalletDashboard} />
        <Redirect from="*" to="/login" />
      </Switch>
    );
  }
}

const mapStateToProps = ({ wallet }: IStoreState) => ({ wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  cleanWallet: () => dispatch(cleanWallet())
});

export const UsingWorkFlow = connect<IStoreStateProps, IDispatchProps, object>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsingWorkFlowComponent));
