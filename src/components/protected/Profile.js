import React from 'react';
import belle from 'belle';
import ImageUploader from '../ImageUploader';
import { getAllUserData } from '../../helpers/userActions';
import { deleteUser } from '../../helpers/auth';

const Button = belle.Button;

class Profile extends React.Component {

  state = {
    user: {}
  }

  componentDidMount = () => {
    this.getUserProfileData();
  }

  getUserProfileData = () => {
    getAllUserData(this.props.user.uid).then((user) => this.setState({ user }));
  }

  render() {
    return (
      <section className="profile">
        {this.state.user.info && <img src={this.state.user.info.avatarUrl} alt={`${this.state.user.info.displayName}'s avatar`} />}
        {this.state.user.info && <h1> {this.state.user.info.displayName} </h1>}
        <ImageUploader userId={this.props.user.uid} />
        {this.state.user.info && <Button onClick={() => deleteUser(this.state.user.info.uid, Object.values(this.state.user.posts))} style={{backgroundColor: '#A91912', color: 'white'}}>Delete Account and Posts</Button>}
      </section>);
  }
}

export default Profile;
