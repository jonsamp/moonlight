import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'belle';
import { Link } from 'react-router-dom';
import Listing from '../Listing';
import Toolbar from '../Toolbar';
import { getAllPosts, getUser } from '../../helpers/userActions';
import ListingModal from '../ListingModal';

export default class Listings extends Component {

  state = {
    listings: [],
    shown: 26, // this is how many listings are shown at one time - defaulting to 25
    beginningListingId: null, // this and the ending listing id might be useful when querying firebase for more while lazy loading
    endingListingId: null,
    isModalOpen: false,
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
  // addSinglePostToList = (postData) => {
  //   const updatedList = this.state.listings.concat(postData);
  //   this.setState({
  //     listings: updatedList,
  //   });
  // }

  // When a post is deleted, cleave it from the herd
  deleteSinglePostFromList = (postId) => {
    const updatedList = this.state.listings.filter((item) => item.id !== postId);
    this.setState({
      listings: updatedList,
    });
  }

  toggleFulfilled = (postId) => {
    const updatedList = this.state.listings.map((item) => {
      const listing = item;
      if (item.id === postId) {
        listing.fulfilled = true;
      }
      return listing;
    });
    this.setState({
      listings: updatedList,
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  renderListings = () => this.state.listings.map((listing) => (
    <Listing
      deleteSinglePostFromList={this.deleteSinglePostFromList} toggleFulfilled={this.toggleFulfilled}
      key={`listing-${listing.id}`}
      {...listing}
    />
      ))

  render() {
    return (
      <div>
        <div className="listings-title">
          <h1>Requests</h1>
          <Link to="/listings/new">
            <Button primary>Create Request</Button>
          </Link>
        </div>
        {/* <Toolbar /> */}
        {this.renderListings()}
        <ListingModal show={this.state.isModalOpen} onHide={closeModal} />
      </div>
    );
  }
}
