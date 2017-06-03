import React from 'react';
import moment from 'moment';
import { Card, Button } from 'belle';
import { Row, Media, Col, Glyphicon } from 'react-bootstrap';
import { deletePost, fulfillRequest, getUser } from '../helpers/userActions';

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: `https://avatar.tobi.sh/${this.props.requesterId}`,
    };
    // this.openModal = this.props.openModal.bind(this.props.id);
  }

  componentDidMount = () => {
    getUser(this.props.requesterId).then((user) => {
      this.setState({ avatarUrl: user.avatarUrl || user.avatar_url });
    });
  }

  deleteRequest = () => {
    const { requesterId, id, ...rest } = this.props;
    deletePost(requesterId, id).then(() => {
      this.props.deleteSinglePostFromList(id);
    });
  }

  fullfillRequest = () => {
    const { requesterId, id, ...rest } = this.props;
    fulfillRequest(requesterId, id).then(() => {
      this.props.toggleFulfilled(id);
    });
  }
  // this renderButtons needs to consider if the user is the owner or not - we might need to maintain a list of "owned listings" for each
  // user for this reason. This keeps the logic on the firebase side - we could do something simpler for now though
  renderButtons(fulfilled) {
    return (
      <Row className="request-action-group">
        <Button className="request-action" onClick={this.deleteRequest}>Delete</Button>
        <Button className="request-action" onClick={this.fullfillRequest}>{ fulfilled ? 'Fulfilled!!!' : 'Fulfill' }</Button>
        <Button className="request-action" primary onClick={this.props.openModal.bind(this, this.props.id)}>View</Button>
      </Row>
    );
  }

  renderBody = () => {
    const { requester, details, jobLocation, startDate, endDate, fulfilled } = this.props;
    const duration = moment.duration(moment(endDate).diff(moment(startDate))).humanize();
    console.log(`${startDate}: ${duration}`);
    return (
      <Row className="request-body">
        <Col md={8}>
          <Media.Heading className="requester">{requester}</Media.Heading>
          <p className="listing-summary">{`Requesting for ${duration} in ${jobLocation}.`}</p>
          <h4 className="title">Details</h4>
          <p>{details}</p>
        </Col>
        <Col md={4}>
          <h4 className="title"><Glyphicon glyph="time" /> Dates</h4>
          <p>{moment(startDate).format('MM/DD/YY')} to {moment(endDate).format('MM/DD/YY')}</p>
          <h4 className="title"><Glyphicon glyph="map-marker" /> {'Location'}</h4>
          <p>{jobLocation}</p>
        </Col>

      </Row>
    );
  }

  render() {
    const { requester, details, jobLocation, duration, fulfilled } = this.props;
    return (
      <Card>
        <Media className="listing">
          <Media.Left>
            <img className="listing-avatar" src={this.state.avatarUrl} alt={`${requester} avatar`} />
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
