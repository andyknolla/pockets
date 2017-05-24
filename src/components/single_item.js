import React, { Component } from 'react';
import helpers from '../utils/helpers';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import back from '../../public/resources/back.png';

function validate(titleInput, urlInput) {
  return {
    titleInput: titleInput.length === 0,
    urlInput: urlInput.length === 0,
  };
}

class SingleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: [],
      postId: undefined,
      titleInput: '',
      urlInput: '',
      confirmDelete: false,
      touched: {
        titleInput: false,
        urlInput: false,
      }
    }
  }

  componentWillMount() {
    helpers.fetchSingleListing( this.props.location.pathname )
      .then(function(data) {
        this.setState({
          listingData: data.data.attributes,
          postId: data.data.id,
          titleInput: data.data.attributes.title,
          urlInput: data.data.attributes.url
        })
      }.bind(this))
  }
  componentDidMount() {
    $('#edit-listing, .delete-button, .dont-delete').hide();
  }
  handleInputChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
  }
  toggleDelete() {
    this.setState({
      confirmDelete: this.state.confirmDelete ? false : true
    })
  }
  onDeleteClick() {
    helpers.deletePost(this.state.postId)
    .then( () => {
      this.props.history.push('/');
    });
  }
  editListing() {
    $('#edit-listing').show();
    $('.single-heading, .edit-button').hide()
  }
  cancel() {
    $('#edit-listing').hide();
    $('.single-heading, .edit-button').show();
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  submitForm(e) {
    e.preventDefault();
    helpers.editListing(this.state.postId, this.state.titleInput, this.state.urlInput )
    .then( () => {
      $('#edit-listing').hide();
      $('.single-heading, .edit-button').show();
    });
  }

  render() {
    const errors = validate(this.state.titleInput, this.state.urlInput);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <div className="single-listing container">
        <div className="eight columns">
          <div className="single-heading">
            <h2>{this.state.listingData.title}</h2>
            <Link to={this.state.listingData.url ? this.state.listingData.url : ''}><p className="">{this.state.listingData.url}</p></Link>
          </div>
          <form id="edit-listing" onSubmit={this.submitForm.bind(this)}>
            <label htmlFor="title-input">Name</label>
            <input
              id="title-input"
              type="text"
              name="titleInput"
              value={this.state.titleInput}
              placeholder="Name"
              className={shouldMarkError('titleInput') ? "error" : ""}
              onChange={this.handleInputChange.bind(this, 'titleInput')}
              onBlur={this.handleBlur('titleInput')}
              ></input>
              <div className={shouldMarkError('titleInput') ? "error-text" : "hidden"}>Cannot be left blank</div>
            <label htmlFor="url-input">Url</label>
            <input id="url-input"
              type="url"
              name="urlInput"
              value={this.state.urlInput}
              placeholder="Url"
              className={shouldMarkError('urlInput') ? "error" : ""}
              onChange={this.handleInputChange.bind(this, 'urlInput')}
              onBlur={this.handleBlur('urlInput')}
              ></input>
            <div className={shouldMarkError('urlInput') ? "error-text" : "hidden"}>Please enter a valid url</div>
            <div>
              <button className="cancel-button" onClick={this.cancel.bind(this)}>Cancel</button>
              <input type="submit" disabled={!isEnabled}></input>
            </div>
          </form>
          <button
            onClick={this.editListing.bind(this)}
            className="edit-button" >Edit</button>
            <div className="delete-group">
              <button
                onClick={this.toggleDelete.bind(this)}
                className={this.state.confirmDelete ? "hidden" : "dummy-delete-button"}>Delete</button>
              <button
                onClick={this.toggleDelete.bind(this)}
                className={this.state.confirmDelete ? "dont-delete" : "hidden"}>No!</button>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className={this.state.confirmDelete ? "delete-button" : "hidden"}>Delete?</button>
            </div>
          <Link to="/" className="back"><img src={back} className="icon" alt="back"/>Back</Link>
        </div>
        <img src="http://placehold.it/350x350" alt="Placeholder" className="four columns"/>
      </div>
    )
  }
}

export default SingleListing;
