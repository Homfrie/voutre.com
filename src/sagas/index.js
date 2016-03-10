import { takeEvery, takeLatest } from 'redux-saga';
import { select, call, put, fork } from 'redux-saga/effects';
import {
  Types as ActionTypes, 
  fetchGAPIComplete, 
  fetchGAPIError, 
  googleUserAuthorizeComplete,
  googleUserAuthorizeError,
  fetchDocsComplete,
  fetchDocsError
} from '../actions';

import {
  authorize as GAPIAuthorize, 
  searchDriveDocs as GAPISearchDriveDocs, 
  loadScript as GAPILoadScript
} from '../lib/google-client';

import {
  isLoginImmediate,
  isGAPILoaded, 
  getSearchQuery
} from '../reducers';

function* loadGAPI() {
  try {
    // TODO Do not load gapi if it's loaded
    yield call(GAPILoadScript);
    yield put(fetchGAPIComplete());
  } catch (e) {
    yield put(fetchGAPIError(e.message));
  }
}

function* googleAuthorize() {
  try {
    // TODO do not login if already logged in
    const loginImmediate = yield select(isLoginImmediate);
    const resp = yield call(GAPIAuthorize, loginImmediate);
    yield put(googleUserAuthorizeComplete(resp));
  } catch (e) {
    yield put(googleUserAuthorizeError(e));
  }
}

function* fetchDocs() {
  try {
    const searchQuery = yield select(getSearchQuery);
    const resp = yield call(GAPISearchDriveDocs, searchQuery);
    yield put(fetchDocsComplete(resp));
  } catch (e) {
    yield put(fetchDocsError(e));
  }
}

function* watchGoogleAuthorize() {
  yield* takeLatest(ActionTypes.GOOGLE_USER_AUTHORIZE_START, googleAuthorize);
}

function* watchLoadGAPI() {
  yield* takeLatest(ActionTypes.FETCH_GAPI_START, loadGAPI);
}

function* watchFetchDocs() {
  yield* takeLatest(ActionTypes.FETCH_DOCS_START, fetchDocs);
}

export default function* root() {
  yield [
    fork(watchFetchDocs), 
    fork(watchLoadGAPI), 
    fork(watchGoogleAuthorize)
  ];
}

/*
export default function* watchSearchDriveDocs() {
  yield* takeLatest(ActionTypes.FETCH_DOCS, searchDriveDocs);
}
*/
