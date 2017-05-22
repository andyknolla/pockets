import React, { Component, PropTypes } from 'react';
import helpers from '../utils/helpers';
import { Link } from 'react-router';
import { elementType } from 'react-prop-types';

class EditListing extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      router: elementType
    }

    this.state = {
      listingData: [],
      postId: undefined
    }
  }

  componentWillMount() {
    helpers.fetchSingleListing( this.props.location.pathname )
      .then(function(data) {
        this.setState({
          listingData: data.data.data.data.attributes,
          postId: data.data.data.data.id
        })
        console.log(data.data.data.data.attributes);
      }.bind(this))
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


  render() {
    return (

      <form id="edit-listing">

        <label htmlFor="title-input">Name</label>
        <input id="title-input" type="text" ref="title" onChange={this.handleTitleInputChange.bind(this)} value={this.state.titleInput}></input>

        <label htmlFor="url-input">Url</label>
        <input id="url-input" type="url" ref="url" onChange={this.handleUrlInputChange.bind(this)} value={this.state.urlInput}></input>
        <input type="submit" onClick={this.submitForm.bind(this)}></input>
      </form>

    )
  }
}

export default EditListing;