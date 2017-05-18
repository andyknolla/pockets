import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Listing from './components/listing';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
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
