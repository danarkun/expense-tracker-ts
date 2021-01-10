import React, { FC, useContext } from 'react';
import { UsersState } from '../types/types';
import { UserItem } from './UserItem';

interface UserListProps {
    userList: UsersState;
}

export const UserList:FC<UserListProps> = (props) => {

    // foreach user is props.users, create a new user element and pass in the user
    return (
        <>
            <h3>Users</h3>
            <ul id="userList" className="list">
                {props.userList.users.map(user => (<UserItem key={user.id} user={user} isList={true}/>))}
            </ul>
        </>
    )
}
