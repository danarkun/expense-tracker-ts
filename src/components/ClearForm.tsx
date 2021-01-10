import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { type } from 'os';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/types';
import { bindActionCreators } from 'redux';
import { startClearData } from '../actions/actions';
import { connect } from "react-redux";

type Props = LinkDispatchProps;

export const ClearData = (props: Props) => {
    const history = useHistory();

    function ConfirmClear() {
        if (window.confirm("Do you really want to clear all data?")) {
            props.startClearData();
            history.push("./Home");
        }
        // if (window.confirm("Do you really want to clear all data?")) {
        //     clearData().then(() =>
        //         history.push("./Home")
        //     )
        // }
    }

    return (
        <div className="component">
            <Button variant="contained" color="secondary" onClick={ConfirmClear}>Clear Form</Button>
        </div>
    )
}


interface LinkDispatchProps {
    startClearData: () => void;
}

// Binds startClearData to dispatch
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    startClearData: bindActionCreators(startClearData, dispatch)
});

export default connect(null, mapDispatchToProps)(ClearData);