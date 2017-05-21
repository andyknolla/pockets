import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App';
import NotFound from './components/not_found';
import SingleListing from './components/single_item';

const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={SingleListing} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);


export default Routes;
