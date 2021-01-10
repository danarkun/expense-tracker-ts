import React, { FC, useContext } from 'react';
import { Transaction, TransactionsState } from '../types/types'

// Class Types
export interface TransactionListProp {
  transactions: TransactionsState;
}

export const Balance: FC<TransactionListProp> = (props) => {
  // States transaction list is passed to us as a prop
  const amounts = props.transactions.transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
    <h1>${total}</h1>
    </>
  )
}
