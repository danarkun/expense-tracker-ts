import React from "react";
import { BrowserRouter as Router, Route, Switch,  NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import AddTransaction from "../components/AddTransaction";
import AddUser from "../components/AddUser";
import ClearForm from "../components/ClearForm";
import Home from "../components/Home";
import TransactionViewer from "../components/TransactionViewer";
import UserViewer from "../components/UserViewer";


const ContentColumn = styled.div`
position: absolute;
top: 100px;
left: 35%;
`;

const HeaderColumn = styled.div`
  top: 0px;
  left: 0px;
  position: absolute;
  width:100%;
`;

const AppRouter = () => (
    <Router>
        <HeaderColumn>
            <ul className="nav" id="navButtons">
                <li>
                    <NavLink exact to="/Home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/AddUser">Add User</NavLink>
                </li>
                <li>
                    <NavLink to="/AddTransaction">Add Transaction</NavLink>
                </li>
                <li>
                    <NavLink to="/TransactionViewer?list">TransactionViewer</NavLink>
                </li>
                <li>
                    <NavLink to="/ClearForm">Clear Form</NavLink>
                </li>
            </ul>
        </HeaderColumn>
        <Switch>
            <ContentColumn>
                <Route exact path="/" render={() => (
                    <Redirect exact from="/" to="/Home" />
                )} />
                <Route render={() => <Redirect to={{ pathname: "/Home" }} />} />
                <Route path="/AddUser" component={AddUser} />
                <Route path="/Home" component={Home} />
                <Route path="/TransactionViewer">
                    <TransactionViewer/>
                </Route>
                <Route path="/UserViewer" component={UserViewer} />
                <Route path="/ClearForm" component={ClearForm} />
                <Route path="/AddTransaction" component={AddTransaction} />
            </ContentColumn>
        </Switch>
    </Router>
)

export default AppRouter;