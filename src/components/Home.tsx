import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startAddTransaction, startAddUser, startClearData, startDeleteTransaction, startDeleteUser } from '../actions/actions';
import { RootState } from "../store/index";
import { AppActions, Transaction, TransactionsState, User, UsersState } from "../types/types";
import { Balance } from "./Balance";
import { Header } from "./Header";
import { IncomeExpenses } from "./IncomeExpenses";
import { TransactionList } from "./TransactionList";
import { UserList } from "./UserList";


interface HomePageProps {
    // Optional
    id?: string;
    colour?: string;
}

// State of entire redux store
interface HomePageState {

}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

export const Home = (props: Props, homePageState: HomePageState) => {    
    const { transactions } = props;
    const { users } = props;

    return (
        <div className="container">
            <Header />
            <UserList userList={users} />
            <Balance transactions={transactions}/>
            <IncomeExpenses transactions={transactions} />
            <TransactionList transactions={transactions} users={users}/>
        </div>
    )
}

// Plain object containing the data our component needs
interface LinkStateProps {
    transactions: TransactionsState;
    users: UsersState;
}

interface LinkDispatchProps {
    startDeleteTransaction: (id: string) => void;
    startAddTransaction: (transaction: Transaction) => void;
    startAddUser: (user: User) => void;
    startDeleteUser: (id: string) => void;
    startClearData: () => void;
}

// Called everytime store changes, and updates the local props (in this case transactions used in DOM) to the updated value in the updated store
const mapStateToProps = (state: RootState, ownProps: HomePageProps): LinkStateProps => ({
    transactions: state.transactions,
    users: state.users
});

// bindActionCreators -> binds action creator functions to be able to call dispatch directly
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps): LinkDispatchProps => ({
    startDeleteTransaction: bindActionCreators(startDeleteTransaction, dispatch),
    startAddTransaction: bindActionCreators(startAddTransaction, dispatch),
    startAddUser: bindActionCreators(startAddUser, dispatch),
    startDeleteUser: bindActionCreators(startDeleteUser, dispatch),
    startClearData: bindActionCreators(startClearData, dispatch),
});

// mapStateToProps -> gets called everytime store changes and subsequently updates the local transactions value
// mapDispatchToProps -> allows us to define functions that are automatically dispatched when called (i.e. startDeleteTransaction), as passes those functions as props to your component 
export default connect(
    mapStateToProps,
    mapDispatchToProps)(Home);