import * as React from 'react';
import { Link } from 'react-router-dom';

export const WalletEnter: React.SFC<{}> = () => {
  return (
    <section>
      <div className="welcome-content">
        <h1>YOUR TRUSTED BLOCKCHAIN WALLET.</h1>
        <p>Securely store, manage and exchange Bitcoin, Ethereum, and other blockchain assets.</p>
        <Link to="/login" className="button">
          <div />
          <span>Enter</span>
        </Link>
      </div>
    </section>
  );
};
