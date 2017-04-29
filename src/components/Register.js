import React, { Component } from 'react';
import { auth, signInWithPopup } from '../helpers/auth';
import belle from 'belle';

const Button = belle.Button;

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.firstName.value, this.lastName.value, this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <Button onClick={() => signInWithPopup('twitter')}>Sign in with Twitter</Button>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" ref={(firstName) => this.firstName = firstName} placeholder="First Name" required="true" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" ref={(lastName) => this.lastName = lastName} placeholder="Last Name" required="true" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email" required="true" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} required="true" />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}
