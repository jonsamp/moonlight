import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Button, DatePicker } from 'belle';
import { Row, Col, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { collectFormValues } from '../../helpers/form';
import { savePost, getUser } from '../../helpers/userActions';

class NewListing extends Component {

  static propTypes = {}

  state = {
    selectedStartDate: new Date(),
    selectedEndDate: new Date(),
    location: '',
    description: '',
    user: {},
    navigateTo: null,
  }

  componentDidMount() {
    getUser(this.props.user.uid).then((user) => {
      this.setState({ user });
    });
  }

  setStartDate = (date) => {
    this.setState({ selectedStartDate: date.value });
  }

  setEndDate = (date) => {
    this.setState({ selectedEndDate: date.value });
  }

  handleNewListingChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleNewListingSubmit = (e) => {
    e.preventDefault();
    savePost(this.props.user, {
      requester: this.state.user.displayName,
      requesterId: this.state.user.uid,
      jobLocation: this.state.location,
      startDate: this.state.selectedStartDate,
      endDate: this.state.selectedEndDate,
      details: this.state.description,
      fulfilled: false,
    }).then(() => {
      this.setState({ navigateTo: '/listings' });
    });
  }

  render() {
    return (
      <div>
        <h1>Request Time Off</h1>
        <div className="new-listing">
          <form
            onChange={this.handleNewListingChange}
            onSubmit={this.handleNewListingSubmit}
          >
            <Row>
              <Col xs={12} sm={6}>
                <div className="date-picker">
                  <ControlLabel>Start Date</ControlLabel>
                  <p>{moment(this.state.selectedStartDate.toString()).format('MM/DD/YYYY')}</p>
                  <DatePicker
                    defaultValue={this.state.selectedStartDate}
                    onUpdate={this.setStartDate}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="date-picker">
                  <ControlLabel>End Date</ControlLabel>
                  <p>{moment(this.state.selectedEndDate.toString()).format('MM/DD/YYYY')}</p>
                  <DatePicker
                    defaultValue={this.state.selectedEndDate}
                    onUpdate={this.setEndDate}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup
                  className="input-field"
                  controlId="location"
                >
                  <ControlLabel>Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="location"
                    placeholder={'Address of work'}
                    value={this.state.location}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="Description">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl name="description" componentClass="textarea" placeholder="" value={this.state.description} rows="8" />
                </FormGroup>
              </Col>
            </Row>
            <Button
              primary
              type="submit"
            >
            Create Request
          </Button>
          </form>
        </div>
        { this.state.navigateTo && <Redirect to={this.state.navigateTo} />}
      </div>
    );
  }
}

export default NewListing;
