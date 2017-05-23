import React, { Component } from 'react';
import List from './list';
import helpers from '../utils/helpers';

function validate(titleInput, urlInput) {
  return {
    titleInput: titleInput.length === 0,
    urlInput: urlInput.length === 0,
  };
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiListings: [],
      titleInput: '',
      urlInput: '',
      touched: {
        titleInput: false,
        urlInput: false,
      }
    }
  }
  componentDidMount() {
    helpers.fetchListings()
    .then(function(data) {
      this.setState({
        apiListings: data.data.data.data
      })
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
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  disabled() {
    
  }
  submitForm(e) {
    e.preventDefault();
    helpers.createNewListing(this.state.titleInput, this.state.urlInput )
    .then( () => {
       window.location.reload();
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
      <div>
        <form id="new-listing" onSubmit={this.submitForm.bind(this)} >
          <div className="new-listing">
            <div className="name-input">
              <label htmlFor="title-input">Name</label>
              <input
                id="title-input"
                type="text"
                ref="title"
                required
                value={this.state.titleInput}
                placeholder="Property name"
                className={shouldMarkError('titleInput') ? "error" : ""}
                onChange={this.handleTitleInputChange.bind(this)}
                onBlur={this.handleBlur('titleInput')}
                ></input>
                <div className={shouldMarkError('titleInput') ? "error-text" : "hidden"}>Cannot be left blank</div>
            </div>
            <div className="url-input">
              <label htmlFor="url-input">Url</label>
              <input
                id="url-input"
                type="url"
                ref="url"
                required
                value={this.state.urlInput}
                placeholder="Url"
                className={shouldMarkError('urlInput') ? "error" : ""}
                onChange={this.handleUrlInputChange.bind(this)}
                onBlur={this.handleBlur('urlInput')}
                ></input>
                <div className={shouldMarkError('urlInput') ? "error-text" : "hidden"}>Please enter a valid url</div>
            </div>
            <input type="submit" disabled={!isEnabled} onClick={this.disabled.bind(this)} value="Enter"></input>
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
