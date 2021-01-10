import { Transaction, ADD_TRANSACTION, DELETE_TRANSACTION, AppActions, ADD_USER, User, DELETE_USER, CLEAR_DATA } from '../types/types'
import { Dispatch } from "react";
import { RootState } from '../store';

// ACTION CREATORS
// Returns an ExpenseActionType (inferred by AddTransactionActionTypes)
export const addTransaction = (transaction: Transaction): AppActions => ({
    type: ADD_TRANSACTION,
    payload: transaction
});

export const deleteTransaction = (id: string): AppActions => ({
    type: DELETE_TRANSACTION,
    payload: id
});

export const addUser = (user: User): AppActions => ({
    type: ADD_USER,
    payload: user
});

export const deleteUser = (id: string): AppActions => ({
    type: DELETE_USER,
    payload: id
})

export const clearData = (): AppActions => ({
    type: CLEAR_DATA
})

// WRAPPING ACTION CREATORS IN FUNCTIONS TO MAP TO DISPATCH
export const startAddTransaction = (transaction: Transaction) =>
{
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        // Pass our new id along with new transaction as an object to addTransaction(...) 
        dispatch(addTransaction(
            transaction
        ))
    }
}
// {
//     return Promise.resolve(
//         // (dispatch: Dispatch<AppActions>, getState:() => RootState) => {
//         //     // Pass our new id along with new transaction as an object to addTransaction(...) 
//         //     dispatch(addTransaction(
//         //         transaction
//         //     ))
//         // }
//     )
// }

export const startDeleteTransaction = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(deleteTransaction(id));
    }
}

export const startAddUser = (user: User) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(addUser(user));
    }
}

export const startDeleteUser = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(deleteUser(id));
    }
}

export const startClearData = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(clearData());
    }
}