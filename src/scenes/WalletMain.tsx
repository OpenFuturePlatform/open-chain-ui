import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { WalletEnter } from '../components/WalletEnter';
import { withBackground } from '../components/withBackground';
import { withMainBackground } from '../components/withMainBackground';
import { WalletWorkFlow } from './WalletWorkFlow';

interface IProps {
  match: { path: string };
}

export const WalletMain: React.SFC<IProps> = props => {
  const path = props.match.path;
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact={true} path={`${path}/`} component={withMainBackground(WalletEnter)} />
        <Route path={path} component={withBackground(WalletWorkFlow)} />
        <Redirect from="*" to="/wallet" />
      </Switch>
    </React.Fragment>
  );
};
