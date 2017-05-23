import React, { Component } from 'react';
import List from './list';
import helpers from '../utils/helpers';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiListings: [],
      titleInput: '',
      urlInput: ''
    }
  }

  componentDidMount() {
    helpers.fetchListings()
    .then(function(data) {
      this.setState({
        apiListings: data.data.data.data
      })
      console.log(data.data.data.data);
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
    helpers.createNewListing(this.state.titleInput, this.state.urlInput )
    .then( () => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div>
        <form id="new-listing">
          <div className="new-listing">
            <div className="name-input">
              <label htmlFor="title-input">Name</label>
              <input
                id="title-input"
                type="text"
                ref="title"
                onChange={this.handleTitleInputChange.bind(this)}
                value={this.state.titleInput}
                placeholder="Property name"
                className=""
                ></input>
            </div>
            <div className="url-input">
              <label htmlFor="url-input">Url</label>
              <input
                id="url-input"
                type="url"
                ref="url"
                onChange={this.handleUrlInputChange.bind(this)}
                value={this.state.urlInput}
                placeholder="Url"
                className=""
                ></input>
            </div>
            <input type="submit" onClick={this.submitForm.bind(this)}></input>
        </div>
        </form>

        <div className="container">
          <List listings={this.state.apiListings} />
        </div>
      </div>
    )
  }
}

export default Home;
