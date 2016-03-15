import React from 'react';
import Immutable from "immutable";
import {render} from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, useRouterHistory} from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import routes from './routes';
import reducers from './reducers';
import sagas from './sagas';

const __BASENAME__ = JSON.stringify(process.env.BASENAME || '');
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(sagas);

const middleware = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(browserHistory)
);

const store = middleware(createStore)(reducers, Immutable.fromJS({}));

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

render(
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById('app')
);
