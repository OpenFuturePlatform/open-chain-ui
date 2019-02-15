import * as React from 'react';
import 'url-search-params-polyfill';

interface IProps {
  delegatesCount: number
  isAllDelegates: boolean
  onAllDelegatesTabClick(value: boolean): void
}

export const DelegateTableTabs = (props: IProps) => {
  return (
    <div className="tabs-area">
      <div onClick={() => props.onAllDelegatesTabClick(true)} className={`tab ${props.isAllDelegates && 'active'}`}>
        <span>All</span>
        <span>{props.delegatesCount}</span>
      </div>
      <div onClick={() => props.onAllDelegatesTabClick(false)} className={`tab ${!props.isAllDelegates && 'active'}`}>
        <span>Casted votes</span>
      </div>
    </div>
  );
};
