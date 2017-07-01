import React, { Component } from 'react';
import moment from 'moment';
import { Card, Button } from 'belle';
import { Row, Media, Col, Glyphicon } from 'react-bootstrap';
import { deletePost, fulfillRequest, getUser } from '../helpers/userActions';
import { respectLineBreaks } from '../helpers/utils';
import Placeholder from './Placeholder';

export default class Listings extends Component {

  state = {
    avatarUrl: `https://avatar.tobi.sh/${this.props.requesterId}`,
    user: {},
  }

  componentDidMount = () => {
    console.log('REQUSETI', this.props.requesterId);
    getUser(this.props.requesterId).then((user) => {
      this.setState({
        avatarUrl: user.avatarUrl || user.avatar_url,
        user,
      });
    });
  }

  deleteRequest = () => {
    const { requesterId, id, ...rest } = this.props;
    deletePost(requesterId, id).then(() => {
      this.props.deleteSinglePostFromList(id);
    });
  }

  fulfillRequest = () => {
    const { requesterId, id, ...rest } = this.props;
    fulfillRequest(requesterId, id, !rest.fulfilled).then(() => {
      this.props.toggleFulfilled(id);
    });
  }

  renderButtons() {
    // Compare the listing owner to the current user. If the same, display the delete and fulfill buttons
    const { fulfilled, requesterId, currentUserId, requester } = this.props;

    return (
      <Row className="request-action-group">
        {
          currentUserId === requesterId ?
            <div>
              <Button className="request-action" onClick={this.deleteRequest}><Glyphicon glyph="trash" /> Delete</Button>
              <Button className="request-action" onClick={this.fulfillRequest}>
                {fulfilled ?
                  <span><Glyphicon glyph="check" /> Request Fulfilled</span> :
                  <span><Glyphicon glyph="unchecked" /> Fulfill Request</span>
                }
              </Button>
            </div> : null
        }
        {
          requester !== 'new-listing' ?
            <Button className="request-action" primary onClick={() => this.props.openModal(this.props, this.state.user)}>View</Button> : null
        }
      </Row>
    );
  }

  renderBody = () => {
    const { details, jobLocation, startDate, endDate, fulfilled, inPersonCoverage, remoteCoverage } = this.props;
    let duration = moment.duration(moment(endDate).diff(moment(startDate))).humanize();

    if (duration === 'a few seconds') {
      duration = 'a day';
    }

    return (
      <Row className="request-body">
        <Col md={8}>
          <Media.Heading className="requester">{this.state.user.displayName}</Media.Heading>
          {fulfilled ?
            <div className="fullfilled-request">
              <Glyphicon glyph="check" /> Request Fullfilled
            </div> : null
          }
          <p className="listing-summary">{`Requesting coverage for ${duration} starting on ${moment(startDate).format('MM/DD/YY')}${jobLocation ? `, located at ${jobLocation}` : ''}.`}</p>
          <h4 className="title">Details</h4>
          <p>{details ? respectLineBreaks(details) : <Placeholder />}</p>
        </Col>
        <Col md={4}>
          <h4 className="title"><Glyphicon glyph="time" className="glyph" /> Dates</h4>
          <p>{moment(startDate).format('MM/DD/YY')} to {moment(endDate).format('MM/DD/YY')}</p>
          <h4 className="title"><Glyphicon glyph="map-marker" className="glyph" /> Location</h4>
          <p>{jobLocation || <Placeholder />}</p>
          <h4 className="title"><Glyphicon glyph="briefcase" className="glyph" /> Coverage</h4>
          {inPersonCoverage ? <p>✓ In person coverage</p> : null}
          {remoteCoverage ? <p>✓ Remote coverage</p> : null}
          {!inPersonCoverage && !remoteCoverage ? <Placeholder /> : null}
        </Col>

      </Row>
    );
  }

  render() {
    const { requester, details, jobLocation, duration } = this.props;
    return (
      <Card>
        <Media className="listing">
          <Media.Left>
            <div className="listing-avatar">
              <img src={this.state.avatarUrl} alt={`${requester} avatar`} />
            </div>
          </Media.Left>
          <Media.Body>
            {this.renderBody()}
            {this.renderButtons()}
          </Media.Body>
        </Media>
      </Card>
    );
  }
}
