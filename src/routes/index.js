import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from '../containers/layouts/App';
import HomeView from '../containers/views/Home';
import CardSetView from '../containers/views/CardSet';
import NotFoundView from '../containers/views/NotFound';
import TutorialView from '../containers/views/Tutorial';


const routes = state => {
  /*
  const requireAuth = (nextState, replace) => {
    const loggedInUser = getState().auth.viewer;
    if (!loggedInUser) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }; 
 */

  return (<Route path="/" component={AppLayout}>
            <IndexRoute 
              component={HomeView} />
            <Route path="sets/:documentId"
              component={CardSetView} />
            <Route path="tutorial"
              component={TutorialView} />
            <Route path="*" 
              component={NotFoundView} />
          </Route>);
};
export default routes;
