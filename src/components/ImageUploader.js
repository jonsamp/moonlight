import React, { Component } from 'react';
import { uploadAvatar } from '../helpers/userActions';
import belle from 'belle';

const Button = belle.Button;

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  state = {
    uploaded: false
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    uploadAvatar(this.props.userId, this.state.file).then((url) => {
      this.setState({ uploaded: true })
      this.props.setAvatarUrl(url)
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        uploaded: false
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = null
    }

    return (
      <div className="previewComponent">
        <div className="imgPreview">
          <p>Please select a profile image.</p>
          {$imagePreview ? $imagePreview : (<img src={this.props.avatarUrl} />)}

        </div>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          <Button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)} primary>{this.state.uploaded ? 'Uploaded!' : 'Upload Image'}</Button>
        </form>
      </div>
    )
  }
}

export default ImageUploader;
