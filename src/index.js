import React from 'react';
import Immutable from "immutable";
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, useRouterHistory} from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import localStore from './lib/store-with-expiration';

import routes from './routes';
import reducers from './reducers';
import sagas from './sagas';
import {userAuthorizeComplete} from './actions';

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: null
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(sagas);

const middleware = applyMiddleware(
  sagaMiddleware,
  //loggerMiddleware,
  routerMiddleware(browserHistory)
);

const store = middleware(createStore)(reducers, Immutable.fromJS({}));

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

const token = localStore.get('token');
if (token !== null) {
  store.dispatch(userAuthorizeComplete(localStore.get('user')));
}

render(
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById('app')
);
