import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

export const Header: React.SFC<{}> = () => {
  return (
    <Link className="logo" to="/wallet/login-type">
      <img src={logo} alt="logo" />
    </Link>
  );
};
