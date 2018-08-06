import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IRouterProps } from '..';
import { IThunkDispatch } from '../actions';
import { cleanWallet } from '../actions/wallet';
import { UploadFile } from '../components/UploadFile';
import { IStoreState, IWallet } from '../configureStore';

interface IStoreStateProps {
  wallet: IWallet | null;
}

interface IDispatchProps {
  cleanWallet(): void;
}

type IProps = IRouterProps & IStoreStateProps & IDispatchProps;

class UploadWorkFlowComponent extends React.Component<IProps> {
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
        <Route exact={true} path={path} component={UploadFile} />
        <Redirect from="*" to={`/login`} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ wallet, version }: IStoreState) => ({ wallet, version });

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
  cleanWallet: () => dispatch(cleanWallet())
});

export const UploadWorkFlow = connect<IStoreStateProps, IDispatchProps, object>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UploadWorkFlowComponent));
