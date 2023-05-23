import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { WalletEnter } from './components/WalletEnter';
import { WalletLoginType } from './components/WalletLoginType';
import { withBackground } from './components/withBackground';
import { withStartBackground } from './components/withStartBackground';
import { configureStore } from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import { CreateWorkFlow } from './scenes/CreateWorkFlow';
import { MainHeader } from './scenes/MainHeader';
import { UsingWorkFlow } from './scenes/UsingWorkFlow';
import './styles/index.css';
import './styles/override.css';

import * as packageJSON from '../package.json';
import {ContractDeploy} from "./scenes/ContractDeploy";
const version = (packageJSON as any).version;
console.log('ui-version: ', version);

export interface IRouterProps extends RouteComponentProps<any> {}

const store = configureStore();

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    // console.log(store.getState());
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <MainHeader />
        <Switch>
          <Route exact={true} path="/" component={withStartBackground(WalletEnter)} />
          <Route path="/login" component={withBackground(WalletLoginType)} />
          <Route path="/new" component={withBackground(CreateWorkFlow)} />
          <Route path="/contract-deploy" component={withBackground(ContractDeploy)} />
          <Route path="/" component={withBackground(UsingWorkFlow)} />
          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
