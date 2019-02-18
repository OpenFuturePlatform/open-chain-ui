import * as React from 'react';
import { ITransaction } from '../configureStore';
import { copy2Clipboard } from '../utils/copy2Clipboard';
import { formatDate } from '../utils/format-date';

const copyAddress = (value: string) => value && copy2Clipboard(value);

const getToField = (transaction: ITransaction) => {
    if (transaction.recipientAddress && transaction.data) {
        return `Contract: ${transaction.recipientAddress}`;
    }
    if (!transaction.recipientAddress) {
        return 'Smart contract deploy';
    }
    return transaction.recipientAddress;
}

interface IProps {
    transaction: ITransaction
    popUpOpen(hash: string): void
}

export const Transaction = ({ transaction, popUpOpen }: IProps) => (
  <div className="transaction">
    <p className={`hash-row copy ${!transaction.status && 'hash-row-failed'}`} onClick={() => popUpOpen(transaction.hash)}>
      {transaction.hash}
    </p>
    <p className="from copy" onClick={() => copyAddress(transaction.senderAddress)}>
      {transaction.senderAddress}
    </p>
    <p className="to copy" onClick={() => copyAddress(transaction.recipientAddress)}>
      {getToField(transaction)}
    </p>
    <p className="date">{formatDate(transaction.timestamp)}</p>
    <p className="amount">{transaction.amount}</p>
    <p className="fee">{transaction.fee}</p>
  </div>
);
