import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import belle from 'belle';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { login, resetPassword, signInWithPopup } from '../helpers/auth';

const Card = belle.Card;
const Button = belle.Button;

function setErrorMsg(loginMessage) {
  return { loginMessage };
}

export default class Login extends Component {

  state = {
    loginMessage: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value).catch(() => {
      this.setState(setErrorMsg('Invalid username/password.'));
    });
  }

  resetPassword = () => {
    resetPassword(this.email.value).then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`))).catch(() => this.setState(setErrorMsg('Email address not found.')));
  }

  render() {
    return (
      <Row className="login">
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
          <Card>
            <h1>
              Login
            </h1>
            <section className="button-group">
              <Button
                onClick={() => signInWithPopup('twitter')}
                style={{
                  width: '100%',
                  background: '#1DA1F2',
                  color: 'white',
                }}
              >
                <i className="fa fa-twitter" aria-hidden="true" /> Login with Twitter
              </Button>
              <Button
                onClick={() => signInWithPopup('facebook')}
                style={{
                  width: '100%',
                  background: '#3B5998',
                  color: 'white',
                }}
              >
                <i className="fa fa-facebook" aria-hidden="true" /> Login with Facebook
              </Button>
              <Button
                onClick={() => signInWithPopup('google')}
                style={{
                  width: '100%',
                  background: '#DF4A32',
                  color: 'white',
                }}
              >
                <i className="fa fa-google" aria-hidden="true" /> Login with Google
              </Button>
            </section>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <h5>Login with email</h5>
              <h6>Don't have an account? <Link to="/register">Register</Link></h6>
              <div className="form-group">
                <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}/>
              </div>
              {this.state.loginMessage && <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.loginMessage}
                <a href="#" onClick={this.resetPassword} className="alert-link"> Forgot Password?</a>
              </div>}
              <Button type="submit" primary style={{ width: "100%" }}>Login</Button>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}
