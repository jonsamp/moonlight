import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Listings from './protected/Listings';
import Profile from './protected/Profile';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
      : <Redirect to="/listings" />}
    />
  );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">🌛 moonlight</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/listings" className="navbar-brand">Listings</Link>
                </li>
                <li>
                  <Link to="/profile" className="navbar-brand">Profile</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <button
                      style={{ border: 'none', background: 'transparent' }}
                      onClick={() => {
                        logout();
                      }}
                      className="navbar-brand"
                    >Logout</button>
                    : <span>
                      <Link to="/login" className="navbar-brand">Login</Link>
                      <Link to="/register" className="navbar-brand">Register</Link>
                    </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute authed={this.state.authed} path="/login" component={Login} />
                <PublicRoute authed={this.state.authed} path="/register" component={Register} />
                <PrivateRoute authed={this.state.authed} path="/listings" component={Listings} />
                <PrivateRoute authed={this.state.authed} path="/profile" component={Profile} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
