import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WalletEnter } from './WalletEnter';

interface IProps {
  match: { path: string };
}

export const WalletMain: React.SFC<IProps> = props => {
  const path = props.match.path;
  return (
    <Switch>
      <Route exact={true} path={`${path}/`} component={WalletEnter} />
      <Redirect from="*" to="/wallet" />
    </Switch>
  );
};
