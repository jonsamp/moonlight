import React from 'react';
import belle from 'belle';
import _ from 'lodash';
import ImageUploader from '../ImageUploader';
import { Row, Col, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { getAllUserData } from '../../helpers/userActions';
import { deleteUser } from '../../helpers/auth';
import { saveUserData } from '../../helpers/userActions';
import { collectFormValues, mergeUserInfo } from '../../helpers/form';
import Spinner from '../Spinner';

const Button = belle.Button;

class Profile extends React.Component {

  state = {
    user: {},
    editing: true,
    enableAccountDeletion: true
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
    this.setState({ editing: !this.state.editing  })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = collectFormValues(e);
    saveUserData(this.props.user.uid, formData).then(this.toggleEditing);
  }

  handleUserInfoChange = (e) => {
    const user = mergeUserInfo(this.state.user, e);
    console.log(user.info);
    this.setState({ user })
  }

  handleDeleteAccountField = (e) => {
    if (e.target.value === this.state.user.info.email) {
      this.setState({ enableAccountDeletion: false })
    } else {
      this.setState({ enableAccountDeletion: true })
    }
  }

  renderUserHeader = (displayName, email, avatarUrl) => {
    return (
      <div className="header">
        <div className="picture-name">
          <img src={avatarUrl} alt={`${displayName}'s avatar`} />
          <div>
            <h1>{displayName}</h1>
            <p>{email}</p>
          </div>
        </div>
        <Button primary
          className="edit-btn"
          onClick={this.toggleEditing}
        >
          Edit&nbsp;Profile
        </Button>
      </div>
    )
  }

  renderUserHeaderEditable = (displayName, email, avatarUrl, uid) => {
    return (
      <div className="header">
        <div className="picture-name">
          <ImageUploader
            userId={uid}
            avatarUrl={avatarUrl}
            setAvatarUrl={this.setAvatarUrl}
          />
          <form
            onChange={this.handleUserInfoChange}
            onSubmit={this.handleSubmit}
            className="user-personal-info"
          >
            <div>
            <FormGroup
              className="input-field"
              controlId='displayName'
            >
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Name'}
                value={displayName}
                required
              />
            </FormGroup>
            <FormGroup
              className="input-field"
              controlId='email'
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Email'}
                value={email}
              />
            </FormGroup>
            </div>
            <Button
              primary
              type="submit"
            >
                Save
            </Button>
          </form>
        </div>
      </div>
    )
  }

  render() {

    // Make sure the user is loaded, otherwise show a spinner
    if (this.state.user.info) {
      const { info: { displayName, email, uid }, posts } = this.state.user
      const avatarUrl = this.state.user.info.avatarUrl || this.state.user.info.avatar_url

      return (
        <section className="profile">
          <Row>
            <section className="user-info">
              {
                this.state.editing ?
                  this.renderUserHeader(displayName, email, avatarUrl) :
                  this.renderUserHeaderEditable(displayName, email, avatarUrl, uid)
              }
            </section>
          </Row>
          <Row>
            <section className="user-detail">
              <form onChange={this.handleUserInfoChange}>
                <Row className="your-info">
                  <Col xs={10}>
                    <h2>Your Information</h2>
                    <p>Your information is publicly viewable when you make a request.</p>
                  </Col>
                  <Col xs={2}>
                    <Button primary>Edit</Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup
                      className="input-field"
                      controlId='practiceLocation'
                    >
                      <ControlLabel>City and State of Practice</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'Practice location'}
                        // value={email}
                      />
                    </FormGroup>
                    <FormGroup
                      className="input-field"
                      controlId='specialty'
                    >
                      <ControlLabel>Specialty</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'Specialty'}
                        // value={displayName}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      className="input-field"
                      controlId='practiceType'
                    >
                      <ControlLabel>Practice Type</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'Practice Type'}
                        // value={email}
                      />
                    </FormGroup>
                    <FormGroup
                      className="input-field"
                      controlId='demographics'
                    >
                      <ControlLabel>Demographics</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'Demographics'}
                        // value={email}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup
                      className="input-field"
                      controlId='website'
                    >
                      <ControlLabel>Website</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'website'}
                        // value={email}
                      />
                    </FormGroup>
                    <FormGroup
                      className="input-field"
                      controlId='phone'
                    >
                      <ControlLabel>Phone Number</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder={'Phone Number'}
                        // value={email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Preferred Contact Method</ControlLabel>
                      <Checkbox id="preferEmail" name="email">
                        Email
                      </Checkbox>
                      <Checkbox id="preferPhone" name="phone">
                        Phone
                      </Checkbox>
                    </FormGroup>
                    <FormGroup controlId="aboutYou">
                      <ControlLabel>About you</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="About your practice" />
                    </FormGroup>
                  </Col>
                </Row>
              </form>
            </section>
          </Row>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6}>
              <section className="danger-zone">
                <h2>Danger Zone</h2>
                <p>Delete your account and all of your posts (past and present). This action is irreversible. To delete your account, type your email address below: <code>{email}</code></p>
                <form
                  onChange={this.handleDeleteAccountField}
                  className="user-personal-info"
                >
                  <FormGroup
                    className="input-field"
                    controlId='deleteAccount'
                  >
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder={'Email'}
                    />
                  </FormGroup>
                </form>
                <Button
                  onClick={() => deleteUser(uid, Object.values(posts))}
                  style={{
                    background: '#A91912',
                    color: 'white'
                  }}
                  disabled={this.state.enableAccountDeletion}
                >
                  Delete Account and Posts
                </Button>
              </section>
            </Col>
          </Row>
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
