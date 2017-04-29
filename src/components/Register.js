import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { auth } from '../helpers/auth';
import belle from 'belle';

const Card = belle.Card;
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
      <Row className="login">
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
        <Card style={{ borderRadius: "6px" }}>
        <h1>Register</h1>
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
          <Button type="submit" primary style={{ width: '100%' }}>Register</Button>
        </form>
        </Card>
      </Col>
    </Row>
    )
  }
}
