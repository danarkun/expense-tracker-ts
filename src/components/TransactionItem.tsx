import React, { FC } from 'react';
import { MenuItem } from '@material-ui/core';
import { Transaction } from '../types/types';

interface TransactionItemProp {
  transaction: Transaction;
}

export const TransactionItem: FC<TransactionItemProp> = (props) => {
  const { transaction } = props;

  return (
    <MenuItem value={transaction.id}>{transaction.text}</MenuItem>
  )
}