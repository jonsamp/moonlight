import React from 'react';
import belle from 'belle';

import { deletePost, fulfillRequest, getUser } from '../helpers/userActions';

const Card = belle.Card;
const Button = belle.Button;

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this.props.id);
  }

  state = {
    avatarUrl: `https://avatar.tobi.sh/${this.props.requesterId}`
  }

  componentDidMount = () => {
    getUser(this.props.requesterId).then((user) => {
      this.setState({ avatarUrl: user.avatarUrl || user.avatar_url });
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
      <div className={'request-action-group'}>
        <Button onClick={this.deleteRequest}>Delete</Button>
        <Button onClick={this.fullfillRequest}>{ fulfilled ? "Fulfilled!!!" : "Fulfill" }</Button>
        <Button onClick={this.openModal}>View</Button>
      </div>
    );
  }

  render() {
    const { requester, details, jobLocation, duration, fulfilled } = this.props;

    return (
      <Card>
        <img className="listing-avatar" src={this.state.avatarUrl} alt={`${requester} avatar`} />
        <h1>{requester}</h1>
        <p>{`Requesting a doctor for ${duration} in ${jobLocation}`}</p>
        <p>{details}</p>
        {this.renderButtons(fulfilled)}
      </Card>
    );
  }
}
