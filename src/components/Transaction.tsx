import * as React from 'react';
import { ITransaction } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import { formatDate } from '../utils/format-date';

const copyAddress = (value: string) => copy2Clipboard(value);

interface IProps {
  transaction: ITransaction;
}

export const Transaction = ({ transaction }: IProps) => (
  <div className="transaction">
    <p className="from copy" onClick={() => copyAddress(transaction.senderAddress)}>
      {transaction.senderAddress}
    </p>
    <p className="to copy" onClick={() => copyAddress(transaction.recipientAddress)}>
      {transaction.recipientAddress}
    </p>
    <p className="date">{formatDate(transaction.timestamp)}</p>
    <p className="amount">{transaction.amount}</p>
    <p className="fee">{transaction.fee}</p>
  </div>
);
