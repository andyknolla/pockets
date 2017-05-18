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
      listings: [
      {
        id: 1,
        title: 'First listing',
        url: 'First url'
      },
      {
        id: 2,
        title: 'Second listing',
        url: 'Second url'
      },
      {
        id: 3,
        title: 'Third listing',
        url: 'Third url'
      },
      {
        id: 4,
        title: 'Fourth listing',
        url: 'Fourth url'
      }
    ],
    apiListings: []

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

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className='App'>
            <div className="App-header">
              <h2>Listings</h2>
            </div>
              <List listings={this.state.apiListings} />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
