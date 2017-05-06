import React from 'react';
import belle from 'belle';
import ImageUploader from '../ImageUploader';
import { getAllUserData } from '../../helpers/userActions';
import { deleteUser } from '../../helpers/auth';
import Spinner from '../Spinner';

const Button = belle.Button;

class Profile extends React.Component {

  state = {
    user: {}
  }

  componentWillMount = () => {
    this.getUserProfileData();
  }

  getUserProfileData = () => {
    getAllUserData(this.props.user.uid).then((user) => this.setState({ user }));
  }

  render() {
    if (this.state.user.info) {
      const { displayName, uid, posts } = this.state.user.info
      const avatarUrl = this.state.user.info.avatarUrl || this.state.user.info.avatar_url


      return (
        <section className="profile">
          <img src={avatarUrl} alt={`${displayName}'s avatar`} />
          <h1>{displayName}</h1>
          <ImageUploader userId={this.props.user.uid} />
          <Button onClick={() => deleteUser(uid, Object.values(posts))} style={{background: '#A91912', color: 'white'}}>Delete Account and Posts</Button>
        </section>
      )
    } else {
      return (
        <Spinner />
      )
    }
  }
}

export default Profile;
