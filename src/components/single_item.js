import React, { Component } from 'react';
import helpers from '../utils/helpers';
//import { elementType } from 'react-prop-types';

class SingleListing extends Component {
  constructor(props) {
    super(props);

    // const propTypes = {
    //   router: elementType
    // }

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
      <div>
          <div>{this.state.listingData.title}</div>
          <div>{this.state.listingData.url}</div>
          <button
            onClick={this.onDeleteClick.bind(this)} >
            Delete
          </button>

          <form id="edit-listing">

            <label htmlFor="title-input">Name</label>
            <input id="title-input" type="text" ref="title" onChange={this.handleTitleInputChange.bind(this)} value={this.state.titleInput}></input>

            <label htmlFor="url-input">Url</label>
            <input id="url-input" type="url" ref="url" onChange={this.handleUrlInputChange.bind(this)} value={this.state.urlInput}></input>
            <input type="submit" onClick={this.submitForm.bind(this)}></input>
          </form>
      </div>
    )
  }
}

export default SingleListing;
