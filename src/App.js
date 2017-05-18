import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import List from './components/list';
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
    ]
  }
}

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className='App'>
            <div className="App-header">
              <h2>Listings</h2>
            </div>
              <List listings={this.state.listings} />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
