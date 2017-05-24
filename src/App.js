import React, { Component } from 'react';
import './css/skeleton.css';
import './css/App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SingleListing from './components/single_item';
import Home from './components/home';
import NotFound from './components/not_found';

class App extends Component {
  render() {
    const regex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    return (
      <div className='App'>
        <div className="App-header">
          <h2>Listings</h2>
        </div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={regex}  component={SingleListing} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
