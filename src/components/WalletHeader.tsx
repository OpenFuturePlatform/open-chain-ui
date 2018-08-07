import * as React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from './SimpleHeader';

export const WalletHeader: React.SFC<{}> = () => {
  return (
    <nav>
      <SimpleHeader />
      <Link to="/wallet" className="link active">
        dashboard
      </Link>
      <Link to="/wallet/info" className="link">
        wallet
      </Link>
      <Link to="/wallet/delegates" className="link">
        delegates
      </Link>
      <div className="profile-info">
        <div className="info">
          <p className="amt">
            33.44680966 <span>open</span>
          </p>
          <p className="address">
            <img src="img/copy-gray.svg" alt="copy" /> 0XFF7508C54D3EF2141D05F7EB1A0CC71969
          </p>
        </div>
        <Link to="/login" className="logout" />
      </div>
    </nav>
  );
};
