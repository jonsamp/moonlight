import React, { Component } from 'react';
import belle, { Button } from 'belle';
import _ from 'lodash';
import ImageUploader from '../ImageUploader';
import { Row, Col, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { getAllUserData } from '../../helpers/userActions';
import { deleteUser } from '../../helpers/auth';
import { saveUserData } from '../../helpers/userActions';
import { collectFormValues, mergeUserInfo } from '../../helpers/form';
import Spinner from '../Spinner';
import Placeholder from '../Placeholder';

class Profile extends Component {

  state = {
    user: {},
    editing: false,
    disableAccountDeletion: true,
    infoEditing: false,
  }

  componentWillMount = () => {
    this.getUserProfileData();
  }

  getUserProfileData = () => {
    getAllUserData(this.props.user.uid).then((user) => this.setState({ user }));
  }

  setAvatarUrl = (url) => {
    const user = this.state.user;
    user.info.avatarUrl = url;
    this.setState({ user });
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  }

  toggleInfoEditing = () => {
    this.setState({ infoEditing: !this.state.infoEditing });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = collectFormValues(e);
    saveUserData(this.props.user.uid, formData).then(this.toggleEditing);
  }

  handleInfoSubmit = (e) => {
    e.preventDefault();
    const formData = collectFormValues(e);
    saveUserData(this.props.user.uid, formData).then(this.toggleInfoEditing);
  }

  handleUserInfoChange = (e) => {
    const user = mergeUserInfo(this.state.user, e);
    this.setState({ user });
  }

  handleDeleteAccountField = (e) => {
    if (e.target.value === this.state.user.info.email) {
      this.setState({ disableAccountDeletion: false });
    } else {
      this.setState({ disableAccountDeletion: true });
    }
  }

  renderUserHeader = (displayName, email, avatarUrl) => (
    <div className="header">
      <div className="picture-name">
        <img src={avatarUrl} alt={`${displayName}'s avatar`} />
        <div>
          <h1>{displayName}</h1>
          <p>{email}</p>
        </div>
      </div>
      <Button
        primary
        className="edit-btn"
        onClick={this.toggleEditing}
      >
          Edit&nbsp;Profile
        </Button>
    </div>
    )

  renderUserHeaderEditable = (displayName, email, avatarUrl, uid) => (
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
              controlId="displayName"
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
              controlId="email"
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

  renderInfoForm = () => (
    <section className="user-detail">
      <Row className="your-info">
        <Col xs={10}>
          <h2>Your Information</h2>
          <p>Your information is publicly viewable when you make a request.</p>
        </Col>
        <Col xs={2}>
          <Button primary onClick={this.toggleInfoEditing} style={{ float: 'right' }}>Edit&nbsp;Information</Button>
        </Col>
      </Row>
      <Row className="info-presentation">
        <Col xs={12} md={6}>
          <ControlLabel>City and State of Practice</ControlLabel>
          <p>{this.state.user.info.practiceLocation || (<Placeholder />)}</p>
          <ControlLabel>Specialty</ControlLabel>
          <p>{this.state.user.info.specialty || (<Placeholder />)}</p>
          <ControlLabel>Practice Type</ControlLabel>
          <p>{this.state.user.info.practiceType || (<Placeholder />)}</p>
          <ControlLabel>Demographics</ControlLabel>
          <p>{this.state.user.info.demographics || (<Placeholder />)}</p>
        </Col>
        <Col xs={12} md={6}>
          <ControlLabel>Website</ControlLabel>
          <p>{this.state.user.info.website || (<Placeholder />)}</p>
          <ControlLabel>Phone Number</ControlLabel>
          <p>{this.state.user.info.phoneNumber || (<Placeholder />)}</p>
          <ControlLabel>Preferred Contact Method</ControlLabel>
          {
              !this.state.user.info.preferEmail && !this.state.user.info.preferPhone ?
                (<Placeholder text="None" />) :
                (
                  <p>
                    <p>{this.state.user.info.preferEmail && '✓ Email'}</p>
                    <p>{this.state.user.info.preferPhone && '✓ Phone'}</p>
                  </p>
                )
            }
          <ControlLabel>About you</ControlLabel>
          <p>{this.state.user.info.aboutYou && this.state.user.info.aboutYou.split('\n').map((item) => (
            <span>
              {item}
              <br />
            </span>
                )) || (<Placeholder />)}</p>
        </Col>
      </Row>
    </section>
    )

  renderInfoFormEditable = () => (
    <section className="user-detail">
      <form
        onChange={this.handleUserInfoChange}
        onSubmit={this.handleInfoSubmit}
      >
        <Row className="your-info">
          <Col xs={10}>
            <h2>Your Information</h2>
            <p>Your information is publicly viewable when you make a request.</p>
          </Col>
          <Col xs={2}>
            <Button primary type="submit" style={{ float: 'right' }}>Save</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup
              className="input-field"
              controlId="practiceLocation"
            >
              <ControlLabel>City and State of Practice</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Practice location'}
                value={this.state.user.info.practiceLocation}
              />
            </FormGroup>
            <FormGroup
              className="input-field"
              controlId="specialty"
            >
              <ControlLabel>Specialty</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Specialty'}
                value={this.state.user.info.specialty}
              />
            </FormGroup>
            <FormGroup
              className="input-field"
              controlId="practiceType"
            >
              <ControlLabel>Practice Type</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Practice Type'}
                value={this.state.user.info.practiceType}
              />
            </FormGroup>
            <FormGroup
              className="input-field"
              controlId="demographics"
            >
              <ControlLabel>Demographics</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Demographics'}
                value={this.state.user.info.demographics}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup
              className="input-field"
              controlId="website"
            >
              <ControlLabel>Website</ControlLabel>
              <FormControl
                type="text"
                placeholder={'website'}
                value={this.state.user.info.website}
              />
            </FormGroup>
            <FormGroup
              className="input-field"
              controlId="phoneNumber"
            >
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                type="text"
                placeholder={'Phone Number'}
                value={this.state.user.info.phoneNumber}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Preferred Contact Method</ControlLabel>
              <Checkbox id="preferEmail" name="email" checked={this.state.user.info.preferEmail}>
                  Email
                </Checkbox>
              <Checkbox id="preferPhone" name="phone" checked={this.state.user.info.preferPhone}>
                  Phone
                </Checkbox>
            </FormGroup>
            <FormGroup controlId="aboutYou">
              <ControlLabel>About you</ControlLabel>
              <FormControl componentClass="textarea" placeholder="About your practice" value={this.state.user.info.aboutYou} rows="8" />
            </FormGroup>
          </Col>
        </Row>
      </form>
    </section>
    )

  render() {
    // Make sure the user is loaded, otherwise show a spinner
    if (this.state.user.info) {
      const { info: { displayName, email, uid }, posts } = this.state.user;
      const avatarUrl = this.state.user.info.avatarUrl || this.state.user.info.avatar_url;

      return (
        <section className="profile">
          <Row>
            <section className="user-info">
              {
                this.state.editing ?
                  this.renderUserHeaderEditable(displayName, email, avatarUrl, uid) :
                  this.renderUserHeader(displayName, email, avatarUrl)
              }
            </section>
          </Row>
          <Row>
            {
              this.state.infoEditing ?
                this.renderInfoFormEditable() :
                this.renderInfoForm()
            }
          </Row>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6}>
              <section className="danger-zone">
                <h2>Danger Zone</h2>
                <p>Delete your account and all of your posts (past and present). This action is irreversible. To delete your account, type your email address below: <br /><code>{email}</code></p>
                <form
                  onChange={this.handleDeleteAccountField}
                  className="user-personal-info"
                >
                  <FormGroup
                    className="input-field"
                    controlId="deleteAccount"
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
                    color: 'white',
                  }}
                  disabled={this.state.disableAccountDeletion}
                >
                  Delete Account and Posts
                </Button>
              </section>
            </Col>
          </Row>
        </section>
      );
    }
    return (
      <Spinner size="4rem" />
    );
  }
}

export default Profile;
