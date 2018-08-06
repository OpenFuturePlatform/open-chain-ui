import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { WalletEnter } from './components/WalletEnter';
import { WalletLoginByPrivKey } from './components/WalletLoginByPrivKey';
import { WalletLoginType } from './components/WalletLoginType';
import { withBackground } from './components/withBackground';
import { withMainBackground } from './components/withMainBackground';
import { configureStore } from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import { CreateWorkFlow } from './scenes/CreateWorkFlow';
import './styles/index.css';

export interface IRouterProps extends RouteComponentProps<any> {}

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={withMainBackground(WalletEnter)} />
        <Route path="/login" component={withBackground(WalletLoginType)} />
        <Route path="/new" component={withBackground(CreateWorkFlow)} />
        <Route path={`/enter-private-key`} component={WalletLoginByPrivKey} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
