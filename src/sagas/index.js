import { takeLatest } from 'redux-saga';
import { cancel, take, race, select, call, put, fork } from 'redux-saga/effects';
import {
  Types as ActionTypes, 
  fetchGAPIComplete, 
  fetchGAPIError, 
  googleUserAuthorizeComplete,
  googleUserAuthorizeError,
  fetchDocsComplete,
  fetchDocsError,
  fetchSetComplete,
  fetchSetError,
  saveStudySessionComplete,
  saveStudySessionError
} from '../actions';

import * as GAPI from '../lib/google-client';

import parseDoc from "../lib/parse-doc.js";

import {
  isLoginImmediate,
  isAutosaveEnabled, 
  isGAPILoaded, 
  getSearchQuery,
  getSetId,
  getCards,
  getSet
} from '../reducers';

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
} 

function* loadGAPI() {
  try {
    // TODO Do not load gapi if it's loaded
    yield call(GAPI.loadScript);
    yield put(fetchGAPIComplete());
  } catch (e) {
    yield put(fetchGAPIError(e.message));
  }
}

function* googleAuthorize() {
  try {
    // TODO do not login if already logged in
    const loginImmediate = yield select(isLoginImmediate);
    const resp = yield call(GAPI.authorize, loginImmediate);
    yield put(googleUserAuthorizeComplete(resp));
  } catch (e) {
    yield put(googleUserAuthorizeError(e));
  }
}

function* fetchSet() {
  try {
    const setId = yield select(getSetId);
    const meta = yield call(GAPI.getById, setId);
    const props = meta.result.appProperties;
    let cards;
    console.info(new Date(props.lastModifiedAt), new Date(meta.result.modifiedTime));
    if(!props) {
      const resp = yield call(GAPI.exportAsHtml, setId);
      cards = parseDoc(resp.body);
    }
    else if(new Date(props.lastModifiedAt).getTime( ) <
            new Date(meta.result.modifiedTime).getTime( )) {
              console.info("changed recently");
              //Change modifiedTime to viewedByMeTime since modified seems to be updated when appProperties are updated...
      const resp = yield call(GAPI.exportAsHtml, setId);
      const cardsFromDoc = parseDoc(resp.body);
      const cardsFromApp = yield call(GAPI.getAppData, props.appDataId);
      //Find the intersect between changes
      cards = cardsFromApp;
    }
    else {
      cards = yield call(GAPI.getAppData, props.appDataId);
      console.info(cards);
    }

    yield put(fetchSetComplete({ 
      cards
    }));
  } catch (e) {
    console.info(e);
    yield put(fetchSetError(e));
  }
}

function* fetchDocs() {
  try {
    const searchQuery = yield select(getSearchQuery);
    const resp = yield call(GAPI.searchDocsByName, searchQuery);
    yield put(fetchDocsComplete(resp));
  } catch (e) {
    yield put(fetchDocsError(e));
  }
}

function* saveStudySession() {
  try {
    const set = yield select(getSet);
    const cards = yield select(getCards);
    const resp = yield call(GAPI.saveAppData, cards.toJS());
    const updateMetaResp = yield call(GAPI.updateDocMeta, set.get('id'), resp.result.id);
    yield put(saveStudySessionComplete(resp));
  } catch (e) {
    console.info("Study sess", e);
    yield put(saveStudySession(e));
  }
}

function* pollAutosave( ) {
  try {
    while(true) {             
      yield call(saveStudySession);
      yield call(delay, 60000);
    }
  } catch(e) {
    //
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

function* watchFetchSet() {
  yield* takeLatest(ActionTypes.FETCH_SET_START, fetchSet);
}

function* watchSaveStudySession() {
  yield* takeLatest(ActionTypes.SAVE_STUDY_SESSION_START, saveStudySession);
}

function* watchAutosavePoll() {
  while(yield take(ActionTypes.START_AUTOSAVE)) {
    const pollBg = yield fork(pollAutosave);
    yield take(ActionTypes.STOP_AUTOSAVE);
    yield cancel(pollBg);
  }
}

export default function* root() {
  yield [
    fork(watchFetchDocs), 
    fork(watchFetchSet), 
    fork(watchLoadGAPI), 
    fork(watchGoogleAuthorize),
    fork(watchSaveStudySession),
    fork(watchAutosavePoll)
  ];
}
