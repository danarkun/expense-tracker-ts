import { DataGrid } from '@material-ui/data-grid';
import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TransactionsState, Transaction, UsersState } from '../types/types';

interface TransactionListProp {
  transactions: TransactionsState;
  users: UsersState;
}

export const TransactionList: FC<TransactionListProp> = (props) => {
  // Using destructuring to pull out transactions list
  const { users } = props;
  const { transactions } = props;

  const history = useHistory();

  function OnTransactionClick(transaction: Transaction) {
    history.push("/TransactionViewer?transaction", transaction);
  }

  // Get user first and last name from userID
  function GetUser(userID: string) {
    const user = users.users.find(u => u.id == userID);
    return user == undefined ? 'deleted user' : `${user.fname} ${user.lname}`
  }

  // Parse transactions time stamp to an easily readable date
  function GetDate(date: Date) {
    const dateString = new Date(date);
    return `${dateString.toLocaleDateString()} ${dateString.toLocaleTimeString()}`
  }

  return (
    <>
      <div style={{ height: 500, width: 600 }}>
        <DataGrid
          columns={[
            { field: 'text', headerName: 'Transaction', width: 175, renderCell: (params) => (<strong>{params.value}</strong>) },
            { field: 'amount', headerName: 'Amount', type: 'number' },
            { field: 'user', headerName: 'Submitted By', width: 130, valueFormatter: ({ value }) => GetUser(value as string) },
            { field: 'timeStamp', headerName: 'Submitted At', width: 200, type: 'date', valueFormatter: ({ value }) => GetDate(value as Date) }
          ]}
          rows={transactions.transactions}
          onCellClick={t => OnTransactionClick(t.data as Transaction)}
        />
      </div>

    </>
  )
}
