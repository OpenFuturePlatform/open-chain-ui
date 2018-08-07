import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SimpleHeader } from '../components/SimpleHeader';
import { WalletHeader } from '../components/WalletHeader';

export const MainHeader: React.SFC<{}> = () => {
  return (
    <Switch>
      <Route path="/wallet" component={WalletHeader} />
      <Route path="*" component={SimpleHeader} />
    </Switch>
  );
};
