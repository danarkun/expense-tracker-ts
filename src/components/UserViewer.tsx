import React, { useState, useEffect, useContext, FC } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { startDeleteUser } from '../actions/actions';
import { RootState } from '../store';
import { TransactionsState } from '../types/types';

type Props = LinkStateProps & LinkDispatchProps;

export const UserViewer:FC<Props> = (props) => {
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    
    const { transactions, startDeleteUser } = props;
    
    const history = useHistory();

    useEffect(() => {
        // Get user that we've been passed from clicked User component
        setUser(location.state);
        return () => {
            // Cleanup code
        }
    }, [location])

    function DeleteUser() {
        startDeleteUser(user.id)
        history.push("./Home");
        // .then(() => {
        //     history.push("./Home");
        // })
    }

    function UserExpenses() {
        var sum = 0;
        if (transactions == undefined) {
            return 0;
        }

        transactions.transactions.map(t => {
            if (t.user == user.id) {
                sum += t.amount;
            }
        })
        return sum;
    }

    return (
        <div className="component">
            <h1>USER VIEWER</h1>
            <br />

            <p><b>User Name: </b>{user.fname} {user.lname}</p>
            <p><b>User Email: </b><a href={`mailto:${user.email}`}>{user.email}</a></p>
            <p><b>User added at: </b>{user.timeStamp == undefined ? "Unknown time" : user.timeStamp.toString()}</p>
            <p><b>User expenditure: </b>${UserExpenses()}</p>
            <button className="btn deleteButton" onClick={() => DeleteUser()}>DELETE USER</button>
        </div>
    )
}

interface LinkStateProps {
    transactions: TransactionsState;
}

interface LinkDispatchProps {
    startDeleteUser: (id: string) => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    transactions: state.transactions
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) : LinkDispatchProps => ({
    startDeleteUser: bindActionCreators(startDeleteUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserViewer);