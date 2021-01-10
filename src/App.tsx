import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Provider } from 'react-redux';
import AppRouter from './router/router'

import { store } from './store/index'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

// import React from 'react';
// import { NavLink, Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import './App.css';
// import styled from 'styled-components'

// import { Home } from './components/Home';
// import { AddTransaction } from './components/AddTransaction';
// import { Provider } from 'react-redux';
// import { store } from './store/index';

// const ContentColumn = styled.div`
// position: absolute;
// top: 100px;
// left: 35%;
// `;

// const HeaderColumn = styled.div`
//   top: 0px;
//   left: 0px;
//   position: absolute;
//   width:100%;
// `;

// function App() {
//   return (
//     <Provider store={store}>
//       <div>
//         <Router>
          // <HeaderColumn>
          //   <ul className="nav" id="navButtons">
          //     <li>
          //       <NavLink exact to="/Home">Home</NavLink>
          //     </li>
          //     <li>
          //       <NavLink to="/AddUser">Add User</NavLink>
          //     </li>
          //     <li>
          //       <NavLink to="/AddTransaction">Add Transaction</NavLink>
          //     </li>
          //     <li>
          //       <NavLink to="/TransactionViewer?list">TransactionViewer</NavLink>
          //     </li>
          //     <li>
          //       <NavLink to="/ClearForm">Clear Form</NavLink>
          //     </li>
          //   </ul>
          // </HeaderColumn>
//           <Switch>
//             <ContentColumn>
//               <Route exact path="/" render={() => (
//                 <Redirect exact from="/" to="/Home" />
//               )} />
//               <Route render={() => <Redirect to={{ pathname: "/Home" }} />} />
//               {/* <Route path="/AddUser" component={AddUser} /> */}
//               <Route path="/Home" component={Home} />
//               {/* <Route path="/TransactionViewer" component={TransactionViewer} /> */}
//               {/* <Route path="/UserViewer" component={UserViewer} /> */}
//               {/* <Route path="/ClearForm" component={ClearForm} /> */}
//               <Route path="/AddTransaction" component={AddTransaction} />
//             </ContentColumn>
//           </Switch>
//         </Router>
//       </div >
//     </Provider >
//   );
// }

// NOTE: Every child element of <GlobalProvider> is passed to GlobalState.GlobalProvier as the children prop
// See GlobalProvier ( {children }) => {}

export default App;
