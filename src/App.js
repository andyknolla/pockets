import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import List from './components/list';
import helpers from './utils/helpers';
injectTapEventPlugin();

class App extends Component {
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
  //  window.location.reload();
  }

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className='App'>
            <div className="App-header">
              <h2>Listings</h2>
            </div>
            <form id="new-listing">

              <label htmlFor="title-input">Name</label>
              <input id="title-input" type="text" ref="title" onChange={this.handleTitleInputChange.bind(this)} value={this.state.titleInput}></input>

              <label htmlFor="url-input">Url</label>
              <input id="url-input" type="url" ref="url" onChange={this.handleUrlInputChange.bind(this)} value={this.state.urlInput}></input>
              <input type="submit" onClick={this.submitForm.bind(this)}></input>
            </form>
              <List listings={this.state.apiListings} />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
