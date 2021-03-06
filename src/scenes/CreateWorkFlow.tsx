import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IRouterProps } from '..';
import { IThunkDispatch } from '../actions';
import { cleanWallet, generateWallet } from '../actions/wallet';
import { WalletCreatePassword } from '../components/WalletCreatePassword';
import { WalletCreationComplete } from '../components/WalletCreationComplete';
import { WalletGenerateSeed } from '../components/WalletGenerateSeed';
import { WalletNewKeys } from '../components/WalletNewKeys';
import { WalletNewSeed } from '../components/WalletNewSeedPhrase';
import { WalletRestore } from '../components/WalletRestore';
import { IStoreState, IWallet } from '../configureStore';

interface IStoreStateProps {
  wallet: IWallet | null;
  seed: string;
}

interface IDispatchProps {
  createWallet(): Promise<void>;
  cleanWallet(): void;
}

type IProps = IRouterProps & IStoreStateProps & IDispatchProps;

class CreateWorkFlowComponent extends React.Component<IProps> {
  public componentDidMount() {
    this.props.cleanWallet();
  }

  public componentWillUnmount() {
    this.props.cleanWallet();
  }

  public render() {
    const { match, seed, wallet } = this.props;
    const path = match.path;

    if (!wallet || !seed) {
      return (
        <Switch>
          <Route exact={true} path={path} component={WalletGenerateSeed} />
          <Route path={`${path}/restore`} component={WalletRestore} />
          <Redirect to={path} />
        </Switch>
      );
    }

    const address = wallet.address;

    return (
      <Switch>
        <Route exact={true} path={path} component={WalletGenerateSeed} />
        <Route path={`${path}/restore`} component={WalletRestore} />
        <Route path={`${path}/seed-phrase`} component={() => <WalletNewSeed seed={seed} address={address} />} />
        <Route path={`${path}/keys`} component={() => <WalletNewKeys wallet={wallet} />} />
        <Route path={`${path}/create`} component={() => <WalletCreatePassword wallet={wallet} />} />
        <Route path={`${path}/complete`} component={() => <WalletCreationComplete />} />
        <Redirect from="*" to={`/login`} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ seed, wallet }: IStoreState) => ({ seed, wallet });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  cleanWallet: () => dispatch(cleanWallet()),
  createWallet: () => dispatch(generateWallet())
});

export const CreateWorkFlow = connect<IStoreStateProps, IDispatchProps, object>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateWorkFlowComponent));
