import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import EditProfile from './components/Users/EditProfile'
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Users/Dashboard";

document.body.style = 'background: #D5D5D5;';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Navbar/>
          <br/>
          <Route path="/" exact component={Home}/>
          <Route path="/users" exact component={UsersList}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Switch>
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/editprofile" exact component={EditProfile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
