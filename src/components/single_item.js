import React, { Component } from 'react';
import helpers from '../utils/helpers';


class SingleListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listingData: []
    }
  }
  
  componentWillMount() {
    helpers.fetchSingleListing( this.props.location.pathname )
      .then(function(data) {
        this.setState({
          listingData: data.data.data.data.attributes
        })
        console.log(data.data.data.data.attributes);
      }.bind(this))
  }

  render() {
    return (
      <div>
          <div>{this.state.listingData.title}</div>
          <div>{this.state.listingData.url}</div>
      </div>
    )
  }
}

export default SingleListing;
