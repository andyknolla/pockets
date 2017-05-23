import React, { Component } from 'react';
import './css/skeleton.css';
import './css/App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { elementType } from 'react-prop-types';

import SingleListing from './components/single_item';
import Home from './components/home';
import helpers from './utils/helpers';
// import NotFound from './components/not_found';

class App extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      router: elementType
    }
  }

  render() {
    return (
      <div className='App'>
        <div className="App-header">
          <h2>Listings</h2>
        </div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={SingleListing} />
            {/* <Route path="*" component={NotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
