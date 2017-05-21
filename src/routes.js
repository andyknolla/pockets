import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App';
import About from './components/about';
import NotFound from './components/not_found';
import SingleListing from './components/single_item';
import EditListing from './components/edit_listing';

const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={SingleListing} />
        <Route path="/:id/edit" component={EditListing} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);


export default Routes;
