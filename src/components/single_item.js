import React, { Component, PropTypes } from 'react';
import helpers from '../utils/helpers';
import { Link } from 'react-router';

//import PropTypes from 'prop-types';
import { elementType } from 'react-prop-types';

class SingleListing extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };



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

  onDeleteClick() {
    helpers.deletePost(this.state.postId)
  //  console.log('this: ', this);
    .then( () => {
      this.props.history.push('/');
   });
    console.log('this: ', this);

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
      </div>
    )
  }
}

export default SingleListing;
