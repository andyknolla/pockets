import React, { Component } from 'react';
import helpers from '../utils/helpers';

import { Link } from 'react-router-dom';
import { elementType } from 'react-prop-types';
import $ from 'jquery';
import back from '../../public/resources/back.png';


class SingleListing extends Component {
  constructor(props) {
    super(props);


    const propTypes = {
      router: elementType
    }

    this.state = {
      listingData: [],
      postId: undefined,
      titleInput: '',
      urlInput: ''
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
        console.log(data.data.data.data.attributes);
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

  submitForm(e) {
    e.preventDefault();
    helpers.editListing(this.state.postId, this.state.titleInput, this.state.urlInput )
    .then( () => {
      this.props.history.push('/');
    });
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

  render() {
    return (
      <div className="single-listing container">
        <div className="eight columns">
          <div className="single-heading">
            <h2>{this.state.listingData.title}</h2>
            <p className="">{this.state.listingData.url}</p>
          </div>
          <form id="edit-listing">
            <label htmlFor="title-input">Name</label>
            <input id="title-input" type="text" ref="title" onChange={this.handleTitleInputChange.bind(this)} value={this.state.titleInput} placeholder="Name"></input>
            <label htmlFor="url-input">Url</label>
            <input id="url-input" type="url" ref="url" onChange={this.handleUrlInputChange.bind(this)} value={this.state.urlInput} placeholder="Url"></input>
            <div>
              <button className="cancel-button" onClick={this.cancel.bind(this)}>Cancel</button>
              <input type="submit" onClick={this.submitForm.bind(this)}></input>
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
