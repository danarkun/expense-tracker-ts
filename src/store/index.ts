import { createStore, combineReducers, applyMiddleware, compose, $CombinedState } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions, TransactionsState, TRANSACTION_DATA, USER_DATA } from '../types/types';
import { transactionReducer, userReducer } from '../reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { storeData, getData } from '../helpers/localStorage';

// Get persistant data from localStorage
const persistantData = {
    transactions: getData(TRANSACTION_DATA),
    users: getData(USER_DATA)
}

const rootReducer = combineReducers({
    transactions: transactionReducer,
    users: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

// Preload the store with any persistantData we've pulled from localStore. If there was no data in storage, start app with reducers initial states.
export const store = createStore(rootReducer, persistantData, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<RootState, AppActions>)))
const unsubscribe = store.subscribe(() => {
    storeData(TRANSACTION_DATA, store.getState().transactions);
    storeData(USER_DATA, store.getState().users);
});