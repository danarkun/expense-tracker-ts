import { getData } from '../helpers/localStorage';
import { TransactionActionTypes, TransactionsState, UsersState, ADD_TRANSACTION, DELETE_TRANSACTION, CLEAR_DATA, UserActionTypes, ADD_USER, DELETE_USER, TransactionType } from '../types/types';

const initialTransactionStateObj: TransactionsState = {
    transactions: [
        {
            id: "1678",
            text: "First Transaction",
            amount: 100,
            user: "1",
            timeStamp: new Date(),
        }
    ]
}

const initialUsersStateObj: UsersState = {
    users: [
        {
            id: "1",
            fname: "Dan",
            lname: "Arkun",
            email: "danarkun@gmail.com",
            timeStamp: new Date()
        }
    ]
}

const initialTransactionState: TransactionsState = getData('transactionData') || initialTransactionStateObj;
const initialUsersState: UsersState = getData('userData') || initialUsersStateObj;

// Reducer takes in a state (current TransactionsState) and action (type of which is any of the defined transactions types) and returns a new TransactionsState
export function transactionReducer(state = initialTransactionState, action: TransactionActionTypes): TransactionsState {
    switch (action.type) {
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload)
            }
        case CLEAR_DATA:
            return {
                ...state,
                transactions: []
            }
        default:
            return state;
    }
}

export function userReducer(state = initialUsersState, action: UserActionTypes): UsersState {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
        case CLEAR_DATA:
            return {
                ...state,
                users: []
            }
        default:
            return state;
    }
}