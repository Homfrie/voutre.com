import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import {push} from 'react-router-redux';

import AppLayout from '../containers/layouts/App';
import HomeView from '../containers/views/Home';
import StudyView from '../containers/views/Study';
import NotFoundView from '../containers/views/NotFound';
import TutorialView from '../containers/views/Tutorial';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('auth'), 
  failureRedirectPath: '/',
  redirectAction: push, 
  predicate: user => user.get('isSignedIn'),
  wrapperDisplayName: 'UserIsAuthenticated' 
});

const routes = state => {
  return (<Route path="/" component={AppLayout}>
            <IndexRoute 
              component={HomeView} />
            <Route path="sets/:documentId"
              component={UserIsAuthenticated(StudyView)} />
            <Route path="tutorial"
              component={TutorialView} />
            <Route path="*" 
              component={NotFoundView} />
          </Route>);
};
export default routes;
