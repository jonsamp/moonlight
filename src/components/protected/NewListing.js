import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Button, DatePicker } from 'belle';
import { Row, Col, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { savePost, getUser } from '../../helpers/userActions';
import Listing from '../Listing';

class NewListing extends Component {

  static propTypes = {
    user: PropTypes.obj,
  }

  state = {
    selectedStartDate: new Date(),
    selectedEndDate: new Date(),
    location: '',
    description: '',
    user: {},
    navigateTo: null,
    inPersonCoverage: false,
    remoteCoverage: false,
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
    if (e.target.type === 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleNewListingSubmit = (e) => {
    e.preventDefault();
    const { user, location, selectedStartDate, selectedEndDate, description, remoteCoverage, inPersonCoverage } = this.state;
    savePost(this.props.user, {
      requester: user.displayName,
      requesterId: user.uid,
      jobLocation: location,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      details: description,
      fulfilled: false,
      remoteCoverage,
      inPersonCoverage,
    }).then(() => {
      this.setState({ navigateTo: '/listings' });
    });
  }

  render() {
    const { user, location, selectedStartDate, selectedEndDate, description, remoteCoverage, inPersonCoverage } = this.state;

    console.log(user);
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
                    min={this.state.selectedStartDate}
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
                <FormGroup>
                  <ControlLabel>Type of coverage needed</ControlLabel>
                  <Checkbox name="inPersonCoverage">
                      In person
                    </Checkbox>
                  <Checkbox name="remoteCoverage">
                      Remote
                    </Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="Description">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl name="description" componentClass="textarea" placeholder="Type of coverage needed, feel free to describe your practice here." value={this.state.description} rows="8" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                { user.uid ?
                  <div>
                    <h2>Request Preview</h2>
                    <Listing
                      key="new-listing"
                      details={description}
                      endDate={selectedEndDate}
                      fulfilled={false}
                      id="new-listing"
                      inPersonCoverage={inPersonCoverage}
                      jobLocation={location}
                      remoteCoverage={remoteCoverage}
                      requester="new-listing"
                      requesterId={user.uid}
                      startDate={selectedStartDate}
                    />
                  </div> : null
                }
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
