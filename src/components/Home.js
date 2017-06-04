import React, { Component } from 'react';
import Logo from '../images/moon.svg';
import { Link } from 'react-router-dom';
import { Button } from 'belle';

export default class Home extends Component {
  render() {
    return (
      <div className="home-banner">
        <div className="main">
          <h1><img src={Logo} className="home-logo" /> moonlight dpc</h1>
          <p>Request time off, in a snap.</p>
          <Link to="/listings">
            <Button primary>Get Started</Button>
          </Link>
        </div>
      </div>
    );
  }
}
