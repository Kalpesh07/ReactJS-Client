import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
 
import {Login} from './components/Auth/Login';
//import { Register } from './components/auth/Register';
import {Home} from './components/Home/Home';

import { history } from './helpers';
import { PrivateRoute } from './components/PrivateRoute'
import { connect } from 'react-redux';
import { alertActions } from './actions';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

class App extends Component {
  constructor(props) {
  super(props);
   
  history.listen((location, action) => {
  // clear alert on location change
  this.props.clearAlerts();
  });
  }
   
  render() {
  const { alert } = this.props;
  return (
  <div>
  {alert.message &&
  <div className={`alert ${alert.type}`}>{alert.message}</div>
  }
  <Router history={history}>
  <div>
   <PrivateRoute exact path="/" component={Home} />
  <Route path="/login" component={Login} />
  {/* <Route path="/register" component={Register} /> */}
  </div>
  </Router>
  </div>
  );
  }
  }
   
  function mapState(state) {
  const { alert } = state;
  return { alert };
  }
   
  const actionCreators = {
  clearAlerts: alertActions.clear
  };
   
  const connectedApp = connect(mapState, actionCreators)(App);
  export { connectedApp as App };
  
