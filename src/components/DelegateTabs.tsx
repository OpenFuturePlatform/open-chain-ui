import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'url-search-params-polyfill';
import { IRouterProps } from '..';

export const DelegateTabs = withRouter((props: IRouterProps) => {
  const params = new URLSearchParams(props.location.search);
  const becomeDelegateForm = params.get('BaD');
  return (
    <div className="nav">
      <Link to="/wallet/delegates" className={`${!becomeDelegateForm && 'active'}`}>
        Vote
      </Link>
      <Link to="/wallet/delegates?BaD=true" className={`${becomeDelegateForm && 'active'}`}>
        Become a Delegate
      </Link>
    </div>
  );
});
