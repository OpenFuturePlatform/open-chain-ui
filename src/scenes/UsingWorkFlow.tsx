import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IRouterProps } from '..';
import { IThunkDispatch } from '../actions';
import { cleanWallet } from '../actions/wallet';
import { UploadFile } from '../components/UploadFile';
import { WalletLoginByPrivKey } from '../components/WalletLoginByPrivKey';
import { IStoreState } from '../configureStore';

interface IDispatchProps {
  cleanWallet(): void;
}

type IProps = IRouterProps & IDispatchProps;

class UsingWorkFlowComponent extends React.Component<IProps> {
  public componentDidMount() {
    this.props.cleanWallet();
  }

  public componentWillUnmount() {
    this.props.cleanWallet();
  }

  public render() {
    const { match } = this.props;
    const path = match.path;

    return (
      <Switch>
        <Redirect exact={true} from={path} to={`${path}/upload`} />
        <Route path="/upload" component={UploadFile} />
        <Route path="/private-key" component={WalletLoginByPrivKey} />
        <Route path="/wallet" component={() => <div>hello wallet route</div>} />
        <Redirect from="*" to="/login" />
      </Switch>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  cleanWallet: () => dispatch(cleanWallet())
});

export const UsingWorkFlow = connect<object, IDispatchProps, object>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsingWorkFlowComponent));
