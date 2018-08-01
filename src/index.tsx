import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { configureStore } from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import { Explorer } from './scenes/Explorer';
import { WalletMain } from './scenes/WalletMain';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Explorer} />
        <Route path="/wallet" component={WalletMain} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
