// Local Storage Identifiers

export const TRANSACTION_DATA = "TRANSACTION_DATA";
export const USER_DATA = "USER_DATA";

// Object Types
export interface Transaction {
    id: string,
    text: string,
    amount: number,
    user: string,
    timeStamp: Date,
}

export enum TransactionType {
    Income,
    Expense
}

export interface User {
    id: string,
    fname: string,
    lname: string,
    email: string,
    timeStamp: Date
}

export interface TransactionsState {
    transactions: Transaction[];
}

export interface UsersState {
    users: User[];
}

// Action Types
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const CLEAR_DATA = "CLEAR_DATA";

export interface AddTransactionAction {
    type: typeof ADD_TRANSACTION
    payload: Transaction
}

export interface DeleteTransactionAction {
    type: typeof DELETE_TRANSACTION
    payload: string
}

export interface AddUserAction {
    type: typeof ADD_USER
    payload: User
}

export interface DeleteUserAction {
    type: typeof DELETE_USER
    payload: string
}

export interface ClearDataAction {
    type: typeof CLEAR_DATA
}

export type TransactionActionTypes = AddTransactionAction | DeleteTransactionAction | ClearDataAction;

export type UserActionTypes = AddUserAction | DeleteUserAction | ClearDataAction;

export type AppActions = TransactionActionTypes | UserActionTypes;