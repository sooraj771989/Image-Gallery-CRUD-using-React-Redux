import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EditDashboard from "./components/dashboard/EditDashboard";
import ArticleAdd from './components/dashboard/ArticleAdd';
 
import ArticleInfo from './components/dashboard/ArticleInfo';
import ArticleEdit from './components/dashboard/ArticleEdit';
import './assets/main.css';
import './assets/app.scss'
import './assets/app.scss'
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

 

class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
           
           <Switch>
                <PrivateRoute exact path="/articles/new" component={ArticleAdd} />
                <PrivateRoute exact path="/articles/:id" component={ArticleInfo} />
                <PrivateRoute exact path="/articles/:id/edit" component={ArticleEdit} />
              <PrivateRoute exact path="/editdashboard" component={EditDashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

 

export default App;