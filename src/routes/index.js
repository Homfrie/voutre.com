import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from '../components/layouts/App';
import HomeView from '../components/views/Home';
import CardSetView from '../components/views/CardSet';
import NotFoundView from '../components/views/NotFound';

export default (<Route path="/" component={AppLayout}>
                  <IndexRoute component={HomeView} />
                  <Route path="/:documentId"
                    component={CardSetView}/>
                  <Route path="*" 
                    component={NotFoundView} />
                </Route>);
