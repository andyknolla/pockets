import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App';
import About from './components/about';
import NotFound from './components/not_found';

const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);


export default Routes;
