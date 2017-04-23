import React from 'react';
import belle from 'belle';

const Card = belle.Card;
const Button = belle.Button;

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this.props.id);
  }
  openModal() {
    console.log('open-modal clicked on id:', this.props.id);
  }
  deleteRequest() {
    console.log('deleteRequest was clicked on id:', this.props.id);
  }
  fullfillRequest() {
    console.log('fullfillRequest was clicked on id:', this.props.id);
  }
  // this renderButtons needs to consider if the user is the owner or not - we might need to maintain a list of "owned listings" for each
  // user for this reason. This keeps the logic on the firebase side - we could do something simpler for now though
  renderButtons() {
    return (
      <div className={'request-action-group'}>
        <Button onClick={this.deleteRequest}>Delete</Button>
        <Button onClick={this.fullfillRequest}>Fullfill</Button>
        <Button onClick={this.openModal}>View</Button>
      </div>
    );
  }

  render() {
    const requester = this.props.requester;
    const details = this.props.details;
    const jobLocation = this.props.jobLocation;
    const duration = this.props.duration;
    return (
      <Card>
        <h1>{requester}</h1>
        <p>{`Requesting a doctor for ${duration} in ${jobLocation}`}</p>
        <p>{details}</p>
        {this.renderButtons()}
      </Card>
    );
  }
}
