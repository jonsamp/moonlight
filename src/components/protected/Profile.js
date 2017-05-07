import React from 'react';
import belle from 'belle';
import _ from 'lodash';
import ImageUploader from '../ImageUploader';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { getAllUserData } from '../../helpers/userActions';
import { deleteUser } from '../../helpers/auth';
import { saveUserData } from '../../helpers/userActions';
import Spinner from '../Spinner';

const Button = belle.Button;

class Profile extends React.Component {

  state = {
    user: {},
    editing: true
  }

  componentWillMount = () => {
    this.getUserProfileData();
  }

  getUserProfileData = () => {
    getAllUserData(this.props.user.uid).then((user) => this.setState({ user }));
  }

  setAvatarUrl = (url) => {
    const user = this.state.user
    user.info.avatarUrl = url
    this.setState({ user })
  }

  toggleEditing = () => {
    const editing = !this.state.editing;
    this.setState({ editing  })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.values(e.target.elements).reduce((capture, formElement) => {
      if (formElement.type === 'checkbox' || formElement.type === 'radio') {
        return {
          ...capture,
          [formElement.id]: formElement.checked
        }
      } else {
        return {
          ...capture,
          [formElement.id]: formElement.value
        }
      }
    }, {})
    this.toggleEditing()
    saveUserData(this.props.user.uid, formData)
  }

  handleUserInfoChange = (e) => {
    const userInfo = {
      ...this.state.user.info,
      [e.target.id]: e.target.value
    }

    const user = {
      ...this.state.user,
      info: userInfo
    }

    this.setState({ user })
  }

  renderUserHeader = (displayName, email, avatarUrl) => {
    return (
      <div className="header">
        <div className="picture-name">
          <img src={avatarUrl} alt={`${displayName}'s avatar`} />
          <div>
            <h1>{displayName || 'peggy'}</h1>
            <p>{email}</p>
          </div>
        </div>
        <Button primary
          className="edit-btn" onClick={this.toggleEditing}>Edit Profile</Button>
      </div>
    )
  }

  renderUserHeaderEditable = (displayName, email, avatarUrl) => {
    return (
      <div className="header">
        <div className="picture-name">
          <ImageUploader userId={this.props.user.uid} avatarUrl={avatarUrl}
          setAvatarUrl={this.setAvatarUrl} />
          <form   onChange={this.handleUserInfoChange}  onSubmit={this.handleSubmit}
            className="user-personal-info"
          >
            <div>
            <FormGroup className="input-field" controlId='displayName'>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Name'}
                value={displayName}
              />
            </FormGroup>
            <FormGroup className="input-field" controlId='email'>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Email'}
                value={email}
              />
            </FormGroup>
            </div>
            <Button primary type="submit">Save</Button>
          </form>
        </div>
      </div>
    )
  }

  render() {

    // Make sure the user is loaded, otherwise show a spinner
    if (this.state.user.info) {
      const { displayName, uid, posts, email } = this.state.user.info
      const avatarUrl = this.state.user.info.avatarUrl || this.state.user.info.avatar_url


      return (
        <section className="profile">
          <section className="user-info">
              {
                this.state.editing ?
                  this.renderUserHeader(displayName, email, avatarUrl) :
                  this.renderUserHeaderEditable(displayName, email, avatarUrl)
              }
          </section>
          {/* <Button onClick={() => deleteUser(uid, Object.values(posts))} style={{background: '#A91912', color: 'white'}}>Delete Account and Posts</Button> */}
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
