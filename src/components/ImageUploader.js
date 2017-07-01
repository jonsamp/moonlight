import React, { Component } from 'react';
import belle from 'belle';
import Spinner from './Spinner';
import { uploadAvatar } from '../helpers/userActions';

const Button = belle.Button;

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  state = {
    uploaded: false,
    uploading: false,
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ uploading: true }, () => {
      uploadAvatar(this.props.userId, this.state.file).then((url) => {
        this.setState({ uploaded: true });
        this.props.setAvatarUrl(url);
        this.setState({ uploading: false });
      });
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
        uploaded: false,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <div className="avatar"><img src={imagePreviewUrl} /></div>;
    } else {
      $imagePreview = null;
    }

    return (
      <div className="previewComponent">
        <div className="imgPreview">
          <p>Please select a profile image.</p>
          {$imagePreview || <div className="avatar"><img src={this.props.avatarUrl} /></div>}

        </div>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => this._handleImageChange(e)}
          />
          <Button
            className="image-upload-submit-button"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}
            primary
          >
            {
              this.state.uploading ?
                <Spinner fill="white" size="1em" /> :
              this.state.uploaded ?
                'Uploaded!' :
                'Upload Image'
            }
          </Button>
        </form>
      </div>
    );
  }
}

export default ImageUploader;
