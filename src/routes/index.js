import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import {push} from 'react-router-redux';

import App from './App';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Study from './Study';
import NotFound from './NotFound';
import Tutorial from './Tutorial';
import EditSet from './EditSet';
import Search from './Search';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('auth'), 
  failureRedirectPath: '/',
  redirectAction: push, 
  predicate: auth => auth.get('isSignedIn'),
  wrapperDisplayName: 'UserIsAuthenticated' 
});

const routes = state => {
  return (<Route path="/" component={App}>
            <IndexRoute 
              component={Landing} />
            <Route path="dashboard"
              component={UserIsAuthenticated(Dashboard)}>
              <IndexRoute
                component={Search} />
              <Route path="sets/:id/cards/:cardId/edit"
                component={EditSet} />
              <Route path="sets/:id/edit"
                component={EditSet} />
            </Route>
            <Route path="study/:id"
              component={Study} />
            <Route path="tutorial"
              component={Tutorial} />
            <Route path="*" 
              component={NotFound} />
          </Route>);
};
export default routes;
