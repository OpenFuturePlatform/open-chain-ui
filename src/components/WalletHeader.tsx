import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IStoreState, IWallet } from '../configureStore';
import copyGray from '../img/copy-gray.svg';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import { SimpleHeader } from './SimpleHeader';

interface IProps {
  wallet: IWallet | null;
  balance: string;
}

export const WalletHeaderComponent: React.SFC<IProps> = ({ wallet, balance }) => {
  const address = wallet ? wallet.address : '';
  const onCopyHandler = (value: string) => copy2Clipboard(value);

  return (
    <nav>
      <SimpleHeader />
      <NavLink exact={true} to="/wallet" className="link">
        dashboard
      </NavLink>
      <NavLink to="/wallet/transactions" className="link">
        wallet
      </NavLink>
      <NavLink to="/wallet/delegates" className="link">
        delegates
      </NavLink>
      <div className="profile-info">
        <div className="info">
          <p className="amt">
            {balance} <span>open</span>
          </p>
          <p className="address">
            <img src={copyGray} alt="copy" onClick={() => onCopyHandler(address)} /> {address}
          </p>
        </div>
        <Link to="/login" className="logout" />
      </div>
    </nav>
  );
};

const mapStateToProps = ({ wallet, balance }: IStoreState) => ({ wallet, balance });

export const WalletHeader = connect<IProps>(mapStateToProps)(WalletHeaderComponent);
