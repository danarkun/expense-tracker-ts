import React, { useState } from 'react'
import { startAddTransaction } from '../actions/actions';
import { connect } from "react-redux";
import { AppActions, Transaction, TransactionsState, TransactionType, User, UsersState } from '../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { v4 as uuid } from "uuid";
import { RootState } from '../store';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


type Props = LinkStateProps & LinkDispatchProps;

export const AddTransaction = (props: Props) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [selectedUser, setSelected] = useState(false);
  // Default to "select user" option
  const [userID, setUser] = useState('default');
  const [transactionType, setType] = useState('default');

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      id: uuid(),
      text,
      amount: +GetAmountFromType(amount, GetTypeEnum(transactionType)),
      user: userID,
      timeStamp: new Date()
    }
    props.startAddTransaction(newTransaction)
    // .then(() => {
    history.push("./Home");
    // })
    // .then(() => {
    //   ResetForm();
    // })
    // .catch((err) => {
    //   console.error(`AddTransaction promise error: ${err}`);
    // })
  }

  // Determine whether to deduct or add amount to total balance (expense: negative, income: positive)
  function GetAmountFromType(amount: number, type: TransactionType): number {
    return type == TransactionType.Income ? amount : -amount;
  }
  
  function GetTypeEnum(type: string): TransactionType {
    return TransactionType[type as keyof typeof TransactionType];
  }

  function SelectUser(user: string) {
    setUser(user);
    setSelected(true);
  }

  return (
    <div className="component">
      <h3>Add new transaction</h3>
      <form name="transForm" id="transForm" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text"><b>Text</b></label><br />
          <TextField variant="outlined" type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="Enter text..." required />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
          ><b>Amount</b> <br />(Negative: expense, Positive: income)</label><br />
          <TextField variant="outlined" type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))} placeholder="Enter amount..." required />
        </div>

        <div className="formcontrol">
          <label htmlFor="type"><b>Transaction Type</b></label><br />
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
            id="type"
            name="type"
            value={transactionType}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => { setType(e.target.value as string) }}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label"}}
            required
            >
              <MenuItem value="default" disabled>Select Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="formcontrol">
          <label htmlFor="user"><b>Assign User</b></label><br />

          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              id="user"
              name="user"
              value={userID}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => { SelectUser(event.target.value as string) }}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              required
            >
              <MenuItem value="default" disabled>
                Select User
              </MenuItem>
              {props.userList.users.map((user) =>
                <MenuItem key={user.id} value={user.id}>{user.fname} {user.lname}</MenuItem>)}
            </Select>
            <FormHelperText>User</FormHelperText>
          </FormControl>
        </div>
        <input type="submit" id="subButton" className={`${props.userList.users.length === 0 ? "blocked" : ""} btn`} value={props.userList.users.length === 0 ? "Add Atleast One User" : "Add transaction"}></input>
      </form>
    </div>
  )
}

interface LinkStateProps {
  userList: UsersState
}

interface LinkDispatchProps {
  startAddTransaction: (transaction: Transaction) => void;
  // startAddTransactioning: (transaction: Transaction) => Promise<void>;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
  userList: state.users
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startAddTransaction: bindActionCreators(startAddTransaction, dispatch),
})

// Everyone importing this file takes this connect as opposed to AddTransaction itself
export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddTransaction);