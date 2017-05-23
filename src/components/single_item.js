import React, { Component } from 'react';
import helpers from '../utils/helpers';
import { Link } from 'react-router-dom';
import { elementType } from 'react-prop-types';
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
          listingData: data.data.data.data.attributes,
          postId: data.data.data.data.id,
          titleInput: data.data.data.data.attributes.title,
          urlInput: data.data.data.data.attributes.url
        })
      }.bind(this))
  }
  componentDidMount() {
    $('#edit-listing').hide();
  }
  handleTitleInputChange() {
    this.setState({
      titleInput: this.refs.title.value
    })
  }
  handleUrlInputChange() {
    this.setState({
      urlInput: this.refs.url.value
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
      this.props.history.push('/');
    });
  }

  render() {
    const errors = validate(this.state.titleInput, this.state.urlInput);
    // const { titleInput, urlInput } = this.state;
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
            <p className="">{this.state.listingData.url}</p>
          </div>
          <form id="edit-listing" onSubmit={this.submitForm.bind(this)}>
            <label htmlFor="title-input">Name</label>
            <input
              id="title-input"
              type="text"
              ref="title"
              value={this.state.titleInput}
              placeholder="Name"
              className={shouldMarkError('titleInput') ? "error" : ""}
              onChange={this.handleTitleInputChange.bind(this)}
              onBlur={this.handleBlur('titleInput')}
              ></input>
              <div className={shouldMarkError('titleInput') ? "error-text" : "hidden"}>Cannot be left blank</div>

            <label htmlFor="url-input">Url</label>
            <input id="url-input"
              type="url"
              ref="url"
              value={this.state.urlInput}
              placeholder="Url"
              className={shouldMarkError('urlInput') ? "error" : ""}
              onChange={this.handleUrlInputChange.bind(this)}
              onBlur={this.handleBlur('urlInput')}
              ></input>
            <div className={shouldMarkError('urlInput') ? "error-text" : "hidden"}>Please enter a valid url</div>
            <div>
              <button className="cancel-button" onClick={this.cancel.bind(this)}>Cancel</button>
              <input type="submit"></input>
            </div>
          </form>
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="delete-button"
            >
            Delete
          </button>
          <button
            onClick={this.editListing.bind(this)}
            className="edit-button" >
            Edit
          </button>
          <Link to="/" className="back"><img src={back} className="icon"/>Back</Link>
        </div>
        <img src="http://placehold.it/350x350" alt="" className="four columns"/>
      </div>
    )
  }
}

export default SingleListing;
