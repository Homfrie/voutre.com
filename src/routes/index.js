import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from '../layouts/App';
import HomeView from '../views/Home';
/*
import AboutPage from './components/AboutPage.js';
   // <Route path="about" component={AboutPage}/>
   // <Route path="*" component={NotFoundPage} />
*/

import NotFoundPage from '../components/NotFoundPage.js';

export default (<Route path="/" component={AppLayout}>
                <IndexRoute component={HomeView} />
                <Route path="*" component={NotFoundPage} />
                </Route>);
