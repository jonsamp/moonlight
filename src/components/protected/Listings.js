import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'belle';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import Listing from '../Listing';
import { getAllPosts } from '../../helpers/userActions';
import ListingModal from '../ListingModal';

export default class Listings extends Component {

  state = {
    listings: [],
    shown: 26, // this is how many listings are shown at one time - defaulting to 25
    beginningListingId: null, // this and the ending listing id might be useful when querying firebase for more while lazy loading
    endingListingId: null,
    isModalOpen: false,
    modalListing: {},
    currentUserId: this.props.user.uid,
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

  // When a post is deleted, cleave it from the herd
  deleteSinglePostFromList = (postId) => {
    const updatedList = this.state.listings.filter((item) => item.id !== postId);
    this.setState({
      listings: updatedList,
    });
  }

  toggleFulfilled = (postId) => {
    const updatedList = this.state.listings.map((listing) => {
      if (listing.id === postId) {
        listing.fulfilled = !listing.fulfilled;
      }
      return listing;
    });
    this.setState({
      listings: updatedList,
    });
  }

  openModal = (listing, user) => {
    const modalListing = _.merge({}, listing, user);
    this.setState({ isModalOpen: true, modalListing });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  renderListings = () => this.state.listings.map((listing) => (
    <Listing
      deleteSinglePostFromList={this.deleteSinglePostFromList}
      toggleFulfilled={this.toggleFulfilled}
      openModal={this.openModal}
      key={`listing-${listing.id}`}
      currentUserId={this.state.currentUserId}
      {...listing}
    />
    ));

  filterLapsedListings = (listings) => listings.filter((listing) => {
    const listingStartDate = (new Date(listing.startDate)).getTime();
    const today = (new Date()).getTime();
    const oneDayInMilliseconds = 86400000;
    return listingStartDate > (today - oneDayInMilliseconds);
  })

  sortListingsByDate = (listings) => listings.sort((a, b) => (new Date(a.startDate)).getTime() - (new Date(b.startDate)).getTime())

  render() {
    return (
      <div>
        <div className="listings-title">
          <h1>Requests</h1>
          <Link to="/listings/new">
            <Button primary>Create Request</Button>
          </Link>
        </div>
        { this.filterLapsedListings(this.sortListingsByDate(this.state.listings)).length ?
            this.renderListings() :
            <div className="request-placeholder">
              <Glyphicon glyph="calendar" className="glyph" />
              <h3>There are currently no active requests.</h3>
              <Link to="/listings/new">
                <Button primary>Create Request</Button>
              </Link>
            </div>
        }
        <ListingModal show={this.state.isModalOpen} onHide={this.closeModal} listing={this.state.modalListing} />
      </div>
    );
  }
}
