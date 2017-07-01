import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'belle';
import { Glyphicon } from 'react-bootstrap';
import Logo from '../images/moon.svg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="home">
          <section className="main">
            <img src={Logo} className="home-logo" />
            <h1>moonlight dpc</h1>
            <p>Request time off, in a snap.</p>
            <Link to="/listings">
              <Button primary>Get Started</Button>
            </Link>
          </section>
        </div>
        <section className="supporting">
          <div className="section">
            <div>
              <h2>Moonlight DPC is a place for Direct Primary Care doctors to connect with other like-minded physicians looking for time off. Whether it be short-term or a recurring event, find other doctors to give you a break.</h2>
            </div>
          </div>
          <div className="section">
            <Glyphicon glyph="home" className="glyph" />
            <div>
              <h2>Going on vacation and want to disconnect completely?</h2>
              <p>Connect with other physicians to provide coverage while you're away.</p>
            </div>
          </div>
          <div className="section">
            <Glyphicon glyph="phone" className="glyph" />
            <div>
              <h2>Looking to turn off the phone overnight?</h2>
              <p>Post a listing to have another doc cover your nights, weekends, or both. </p>
            </div>
          </div>
        </section>
        <section className="cta">
          <h2>Get started.</h2>
          <Link to="/listings">
            <Button primary>Sign up</Button>
          </Link>
        </section>
      </div>
    );
  }
}
