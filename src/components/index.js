import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Glyphicon } from 'react-bootstrap';
import { Route, BrowserRouter, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Listings from './protected/Listings';
import Profile from './protected/Profile';
import NewListing from './protected/NewListing';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import Logo from '../images/moon.svg';
import Spinner from './Spinner';

require('../config/belleStyles');

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
    user: {},
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: {},
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getUser = (user) => {
    this.setState({ user });
  }

  render() {
    return this.state.loading ? <div className="spinner-position"><Spinner size="5rem" /></div> : (
      <BrowserRouter>
        <div>
          {this.state.authed ?
            <div className="beta-banner">
              <div>Moonlight DPC is currently in beta. Please help us with your feedback.</div>
              <a href="mailto:feedback@moonlightdpc.com?subject=Moonlight DPC Feedback">
                <button className="feedback-button">
                  Provide Feedback
                </button>
              </a>
            </div> :
            null
          }
          <nav className="navbar navbar-default navbar-static-top">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <img
                  src={Logo} style={{
                    height: '16px',
                    display: 'inline-block',
                    marginRight: '0.25rem',
                    position: 'relative',
                    top: '-0.1rem',
                  }}
                /> moonlight dpc
              </Link>
            </div>
            <ul className="nav">
              {this.state.authed ?
                <li>
                  <NavLink to="/listings" activeClassName="nav-active">
                    <button className="nav-button">
                      <Glyphicon glyph="menu-hamburger" /> Requests
                    </button>
                  </NavLink>
                </li> : null
              }
              {this.state.authed ?
                <li>
                  <NavLink to="/profile" activeClassName="nav-active">
                    <button className="nav-button">
                      <Glyphicon glyph="user" /> Profile
                    </button>
                  </NavLink>
                </li> : null
              }
              {this.state.authed ?
                <li>
                  <button className="nav-button" onClick={logout}>
                    <Glyphicon glyph="log-out" /> Logout
                  </button>
                </li> :
                <li>
                  <Link to="/login">
                    <button className="nav-button">
                      Login
                    </button>
                  </Link>
                </li>
              }
              {this.state.authed ?
                null :
                <li>
                  <Link to="/register">
                    <button className="nav-button">
                      Register
                  </button>
                  </Link>
                </li>
              }
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <div className="container">
            <div className="row">
              <Switch>
                <PublicRoute authed={this.state.authed} path="/login" component={Login} />
                <PublicRoute authed={this.state.authed} path="/register" component={Register} />
                <PrivateRoute exact authed={this.state.authed} path="/listings" component={() => (<Listings {...this.state} />)} />
                <PrivateRoute authed={this.state.authed} path="/profile" component={() => (<Profile {...this.state} />)} />
                <PrivateRoute authed={this.state.authed} path="/listings/new" component={() => (<NewListing {...this.state} />)} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
