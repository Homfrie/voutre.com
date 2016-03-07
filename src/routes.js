import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import UserAuthContainer from './containers/UserAuth';
/*
import AboutPage from './components/AboutPage.js';
   // <Route path="about" component={AboutPage}/>
   // <Route path="*" component={NotFoundPage} />
*/

import NotFoundPage from './components/NotFoundPage.js';

export default (<Route path="/" component={App}>
                <IndexRoute component={UserAuthContainer} />
                <Route path="*" component={NotFoundPage} />
                </Route>);
