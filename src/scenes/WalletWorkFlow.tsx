import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WalletGenerateSeed } from '../components/WalletGenerateSeed';
import { WalletLoginByPrivKey } from '../components/WalletLoginByPrivKey';
import { WalletLoginType } from '../components/WalletLoginType';

interface IProps {
  match: { path: string };
}

export const WalletWorkFlow: React.SFC<IProps> = props => {
  const path = props.match.path;
  return (
    <Switch>
      <Route exact={true} path={`${path}/login-type`} component={WalletLoginType} />
      <Route exact={true} path={`${path}/enter-private-key`} component={WalletLoginByPrivKey} />
      <Route exact={true} path={`${path}/generate-seed-phrase`} component={WalletGenerateSeed} />
      <Redirect from="*" to={`${path}/login-type`} />
    </Switch>
  );
};
