import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Explorer } from './scenes/Explorer';
import { WalletEnter } from './scenes/WalletEnter';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Explorer} />
      <Route path="/wallet" component={WalletEnter} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
