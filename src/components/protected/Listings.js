import React, { Component } from 'react';
import _ from 'lodash';
import Listing from '../Listing';
import Toolbar from '../Toolbar';
import { savePost, getAllPosts } from '../../helpers/auth';

// Random lady names for card distinction before we have a form.
const names = [
  'Beth',
  'Peggy',
  'Lillian',
  'Olivia',
  'Hildegard',
  'Mary',
  'Rosie'
];

export default class Listings extends Component {

  state = {
    listings: [],
    shown: 26, // this is how many listings are shown at one time - defaulting to 25
    beginningListingId: null, // this and the ending listing id might be useful when querying firebase for more while lazy loading
    endingListingId: null,
  }

  componentDidMount = () => {
    if (this.props.authed) {
      this.retrieveAllPosts();
    }
  }

  retrieveAllPosts = () => {
    getAllPosts().then((listings) => {
      this.setState({ listings });
    });
  }

  // When a post is saved, add it to state
  addSinglePostToList = (postData) => {
    const updatedList = this.state.listings.concat(postData);
    this.setState({
      listings: updatedList,
    });
  }

  // When a post is deleted, cleave it from the herd
  deleteSinglePostFromList = (postId) => {
    const updatedList = this.state.listings.filter((item) => {
      return item.id !== postId;
    });
    this.setState({
      listings: updatedList,
    });
  }

  // placeholder to create sample requests
  sendPostToDB = () => {
    return savePost(this.props.user, {
      requester: names[Math.floor(Math.random() * (names.length - 1))],
      requesterId: this.props.user.uid,
      jobLocation: 'Salina, KS',
      duration: '4 days',
      details: "I'll be out of the office for 4 days on vacation. I have about 20 patients but on average only 3 contact me a day - should be pretty laid back.",
    }).then((postData) => {
      this.addSinglePostToList(postData);
    });
  }

  renderListings = () => {
    if (this.state.listings) {
      return this.state.listings.map((listing) => {
        return (<Listing key={`listing-${listing.id}`} {...listing} deleteSinglePostFromList={this.deleteSinglePostFromList} />);
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Requests</h1>
        <button onClick={this.sendPostToDB}>NEW POST</button>
        <Toolbar />
        {this.renderListings()}
      </div>
    );
  }
}
