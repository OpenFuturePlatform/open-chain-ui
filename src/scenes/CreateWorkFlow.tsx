import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { IThunkDispatch } from '../actions';
import { cleanWallet, generateWallet } from '../actions/wallet';
import { WalletCreatePassword } from '../components/WalletCreatePassword';
import { WalletGenerateSeed } from '../components/WalletGenerateSeed';
import { WalletNewKeys } from '../components/WalletNewKeys';
import { WalletNewSeed } from '../components/WalletNewSeedPhrase';
import { IStoreState, IWallet } from '../configureStore';

interface IRouterProps extends RouteComponentProps<any> {}

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
      return <WalletGenerateSeed />;
    }

    return (
      <Switch>
        <Route exact={true} path={path} component={WalletGenerateSeed} />
        <Route path={`${path}/seed-phrase`} component={() => <WalletNewSeed seed={seed} address={wallet.address} />} />
        <Route path={`${path}/new-keys`} component={() => <WalletNewKeys wallet={wallet} />} />
        <Route path={`${path}/create-password`} component={() => <WalletCreatePassword wallet={wallet} />} />
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
