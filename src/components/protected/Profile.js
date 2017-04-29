import React from 'react';
import ImageUploader from '../ImageUploader';

class Profile extends React.Component {

  render() {
    return (
      <div>
        <h1> Profile </h1>
        <ImageUploader userId={this.props.user.uid} />
      </div>);
  }
}

export default Profile;
