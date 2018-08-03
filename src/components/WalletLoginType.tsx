import * as React from 'react';
import { Link } from 'react-router-dom';
import create from '../img/create.svg';
import enterKey from '../img/enter-key.svg';
import restore from '../img/restore.svg';
import upload from '../img/upload.svg';

export const WalletLoginType: React.SFC<{}> = () => {
  return (
    <section>
      <div className="select-type">
        <h2>Select type of login</h2>
        <div className="links">
          <Link to="/new">
            <img src={create} alt="create" />
            <h3>
              Create <br /> a new wallet
            </h3>
          </Link>
          <Link to="/enter-private-key">
            <img src={enterKey} alt="enter-key" />
            <h3>
              Enter <br /> private key
            </h3>
          </Link>
          <Link to="/upload">
            <img src={upload} alt="upload" />
            <h3>
              Upload <br /> file
            </h3>
          </Link>
          <Link to="/restore">
            <img src={restore} alt="restore" />
            <h3>
              Restore <br /> wallet
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
};
