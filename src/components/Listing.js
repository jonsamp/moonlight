import React from 'react';
import belle from 'belle';
import { Row, Media, Col, Glyphicon } from 'react-bootstrap';

import { deletePost, fulfillRequest, getUser } from '../helpers/userActions';

const Card = belle.Card;
const Button = belle.Button;

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: `https://avatar.tobi.sh/${this.props.requesterId}`,
    };
    this.openModal = this.openModal.bind(this.props.id);
  }

  componentDidMount = () => {
    getUser(this.props.requesterId).then((user) => {
      this.setState({ avatarUrl: user.avatar_url });
    });
  }

  openModal = () => {
    console.log('open-modal clicked on id:', this.props.id);
  }

  deleteRequest = () => {
    const { requesterId, id } = this.props;
    deletePost(requesterId, id).then(() => {
      this.props.deleteSinglePostFromList(id);
    });
  }

  fullfillRequest = () => {
    const { requesterId, id } = this.props;
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
        <Button className="request-action" primary onClick={this.openModal}>View</Button>
      </Row>
    );
  }

  renderBody = () => {
    const { requester, details, jobLocation, duration, fulfilled } = this.props;
    return (
      <Row className="request-body">
        <Col md={8}>
          <Media.Heading>{requester}</Media.Heading>
          <p>{`Requesting a doctor for ${duration} in ${jobLocation}`}</p>
          <p>{details}</p>
        </Col>
        <Col md={4}>
          <h5><Glyphicon glyph="time" /> {'Dates'}</h5>
          <p>{duration}</p>
          <h5><Glyphicon glyph="map-marker" /> {'Location'}</h5>
          <p>{jobLocation}</p>
        </Col>

      </Row>
    );
  }

  render() {
    const { requester, details, jobLocation, duration, fulfilled } = this.props;
    return (
      <Card>
        <Media className="moonlight-request">
          <Media.Left className="request-identity">
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
