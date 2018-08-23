import * as React from 'react';

export const TransactionsHeader = () => (
  <div className="head">
    <p className="from">From</p>
    <p className="to">To</p>
    <p className="date">Date</p>
    <p className="amount">
      Amount <span>open</span>
    </p>
    <p className="fee">
      Fee <span>open</span>
    </p>
  </div>
);
