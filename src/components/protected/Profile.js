import React from 'react';
import ImageUploader from '../ImageUploader';

class Profile extends React.Component {

  render() {
    return (
      <div>
        <h1> { this.props.user.email } </h1>
        <ImageUploader userId={this.props.user.uid} />
      </div>);
  }
}

export default Profile;
