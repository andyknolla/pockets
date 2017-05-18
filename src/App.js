import React, { Component } from 'react';
//import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Listing from './components/listing';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className='App'>
            <div className="App-header">
              <h2>Listings</h2>
            </div>
            <Listing />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
