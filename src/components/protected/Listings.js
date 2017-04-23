import React from 'react';
import Listing from '../Listing';
import Toolbar from '../Toolbar';

const defaultListings = [
  {
    id: 1,
    requester: 'Cooper',
    requesterId: 12345,
    jobLocation: 'Salina, KS',
    duration: '4 days',
    details: "I'll be out of the office for 4 days on vacation. I have about 20 patients but on average only 3 contact me a day - should be pretty laid back.",
  },
  {
    id: 2,
    requester: 'Jon',
    requesterId: 6789,
    jobLocation: 'Chanute, KS',
    duration: '7 days',
    details: "I'll be out of the office for a week on vacation. I have about 20 patients but on average only 3 contact me a day - should be pretty laid back.",
  },
];

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: defaultListings,
      shown: 25, // this is how many listings are shown at one time - defaulting to 25
      beginningListingId: null, // this and the ending listing id might be useful when querying firebase for more while lazy loading
      endingListingId: null,
    };
  }

  renderListings() {
    return this.state.listings.map((listing) => (
      <Listing key={`listing-${listing.id}`} {...listing} />
    ));
  }

  render() {
    return (
      <div>
        <h1>Requests</h1>
        <Toolbar />
        {this.renderListings()}
      </div>
    );
  }
}
