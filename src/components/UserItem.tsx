import React, { FC } from 'react';
import { useHistory } from "react-router-dom";
import { MenuItem } from '@material-ui/core';
import { User } from '../types/types';

interface UserProps {
    user: User;
    isList: boolean;
}

export const UserItem: FC<UserProps> = (props) => {
    const { user, isList } = props;

    function ResolveComponentType() {
        return isList ? <UserInList /> : <UserInSelect />
    }

    const UserInList = () => {
        const history = useHistory();
        return (
            <li value={user.id} className="clickableList" onClick={() => history.push("/UserViewer", user)}>
                {user.fname} {user.lname} <span>{user.email}</span>
            </li>
        )
    }

    const UserInSelect = () => {
        return (
            <MenuItem value={user.id}>{user.fname} {user.lname}</MenuItem>
        )
    }

    return (
        <ResolveComponentType />
    )
}
