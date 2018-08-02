import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WalletCreatePassword } from '../components/WalletCreatePassword';
import { WalletGenerateSeed } from '../components/WalletGenerateSeed';
import { WalletLoginByPrivKey } from '../components/WalletLoginByPrivKey';
import { WalletLoginType } from '../components/WalletLoginType';
import { WalletNewKeys } from '../components/WalletNewKeys';
import { WalletNewSeed } from '../components/WalletNewSeedPhrase';

interface IProps {
  match: { path: string };
}

export const WalletWorkFlow: React.SFC<IProps> = props => {
  const path = props.match.path;
  return (
    <Switch>
      <Route exact={true} path={`${path}/login-type`} component={WalletLoginType} />
      <Route exact={true} path={`${path}/generate-seed-phrase`} component={WalletGenerateSeed} />
      <Route exact={true} path={`${path}/new-seed-phrase`} component={WalletNewSeed} />
      <Route exact={true} path={`${path}/new-keys`} component={WalletNewKeys} />
      <Route exact={true} path={`${path}/create-password`} component={WalletCreatePassword} />
      <Route exact={true} path={`${path}/enter-private-key`} component={WalletLoginByPrivKey} />
      <Redirect from="*" to={`${path}/login-type`} />
    </Switch>
  );
};
