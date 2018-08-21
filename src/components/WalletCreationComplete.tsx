import * as React from 'react';
import { Link } from 'react-router-dom';
import crumb from '../img/crumb.svg';

export const WalletCreationComplete: React.SFC<{}> = () => {
  return (
    <section>
      <div className="form-content">
        <div className="crumbs">
          <Link to="/login">Select type of login</Link>
          <img src={crumb} alt=">" />

          <Link to="/new">Create new wallet</Link>
          <img src={crumb} alt=">" />
        </div>
        <div className="name">
          <h2>Complete</h2>
        </div>
        <form>
          <h2 className="generate">
            Wallet registration <br />
            is complete!
          </h2>
          <p>
            I understand that my funds are securely held by this device, not by the
            <br />
            company, and I will store the file with the keys in a safe place
          </p>
          <Link to="/login" className="button">
            <div />
            <span>Complete!</span>
          </Link>
        </form>
      </div>
    </section>
  );
};
