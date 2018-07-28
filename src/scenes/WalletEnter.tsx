import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export const WalletEnter: React.SFC<{}> = () => {
  return (
    <div>
      <Header />
      <div className="main-background" />
      <section>
        <div className="welcome-content">
          <h1>YOUR TRUSTED BLOCKCHAIN WALLET.</h1>
          <p>Securely store, manage and exchange Bitcoin, Ethereum, and other blockchain assets.</p>
          <Link to="/wallet/login-type" className="button">
            <div />
            <span>Enter</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
