import React from 'react';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './app';


export const AppRouter = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);
