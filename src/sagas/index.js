import { takeLatest } from 'redux-saga';
import { cancel, take, race, select, call, put, fork } from 'redux-saga/effects';
import store from '../lib/store-with-expiration';
import {
  Types as ActionTypes, 
  userAuthorizeComplete,
  userAuthorizeError,
  saveSetComplete,
  saveSetError,
  fetchSetComplete,
  fetchSetError,
  fetchSetsComplete,
  fetchSetsError,
  fetchCardComplete,
  fetchCardError,
  saveStudySessionComplete,
  saveStudySessionError,
  saveCardComplete,
  saveCardError
} from '../actions';

import * as client from '../lib/voutre-client';

import parseDoc from "../lib/parse-doc.js";

import {
  getUserId
} from '../reducers';

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
} 

function* authorize({provider, code}) {
  try {
    const resp = yield call(client.authorize, provider, code);
    store.set('token', resp.data.data.jwt, resp.data.data.exp);
    store.set('user', resp.data.data.user);
    yield put(userAuthorizeComplete(resp.data.data.user));
  } catch (e) {
    yield put(userAuthorizeError(e));
  }
}

function* saveCard({card}) {
  try {
    const token = store.get('token');
    const resp = yield call(client.saveCard, token, card);
  } catch (e) {
    yield put(saveCardError(e));
  }
}

function* fetchCard({setId, id}) {
  try {
    const token = store.get('token');
    const cardResp = yield call(client.fetchCard, token, {setId, id});
    yield put(fetchCardComplete({resp: cardResp.data.data}));
  } catch (e) {
    yield put(fetchCardError(e));
  }
}

function* saveSet({set}) {
  try {
    const token = store.get('token');
    const resp = yield call(client.saveSet, token, set);
    yield put(saveSetComplete(resp.data.data));
  } catch (e) {
    yield put(saveSetError(e));
  }
}

function* fetchSet({id, cardId}) {
  try {
    const token = store.get('token');
    const resp = yield call(client.fetchSets, token, {id});
    const data = cardId ? Object.assign(resp.data.data, 
                        {activeIndex: 
                          resp.data.data.cards.findIndex( c => c.id == cardId )}) :
                          resp.data.data;
    yield put(fetchSetComplete(data));
  } catch (e) {
    yield put(fetchSetError(e));
  }
}

function* fetchSets({query}) {
  try {
    const token = store.get('token');
    const userId = yield select(getUserId);
    const resp = yield call(client.fetchSets, token, {query});
    yield put(fetchSetsComplete(resp.data.data));
  } catch (e) {
    yield put(fetchSetsError(e));
  }
}

function* createSet({name, cards}) {
  try {
    const token = store.get('token');
    const resp = yield call(client.createSet, token, {name, cards});
    yield put(fetchSetsComplete(resp.data.data));
  } catch (e) {
    yield put(fetchSetsError(e));
  }
}


function* saveStudySession() {
  try {
    //const set = yield select(getSet);
    //const cards = yield select(getCards);
    //const resp = yield call(client.saveAppData, cards.toJS());
    //const updateMetaResp = yield call(client.updateDocMeta, set.get('id'), resp.result.id);
    //yield put(saveStudySessionComplete(resp));
  } catch (e) {
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

function* watchAuthorize() {
  yield* takeLatest(ActionTypes.USER_AUTHORIZE_START, authorize);
}

function* watchFetchSet() {
  yield* takeLatest(ActionTypes.FETCH_SET_START, fetchSet);
}

function* watchFetchSets() {
  yield* takeLatest(ActionTypes.FETCH_SETS_START, fetchSets);
}

function* watchSaveStudySession() {
  yield* takeLatest(ActionTypes.SAVE_STUDY_SESSION_START, saveStudySession);
}

function* watchSaveCard() {
  yield* takeLatest(ActionTypes.SAVE_CARD_START, saveCard);
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
    fork(function* watchSaveSet() {
      yield* takeLatest(ActionTypes.SAVE_SET_START, saveSet);
    }), 
    fork(function* watchFetchCard() {
      yield* takeLatest(ActionTypes.FETCH_CARD_START, fetchCard);
    }), 
    fork(watchFetchSet), 
    fork(watchFetchSets), 
    fork(watchSaveCard), 
    fork(watchAuthorize),
    fork(watchSaveStudySession),
    fork(watchAutosavePoll)
  ];
}
