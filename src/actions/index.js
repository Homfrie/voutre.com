import Immutable from 'immutable';

export const Types = {
  UPDATE_SET: 'UPDATE_SET',
  MARK_CARD_CORRECT: 'MARK_CARD_CORRECT',
  MARK_CARD_INCORRECT: 'MARK_CARD_INCORRECT',
  SELECT_SET: 'SELECT_SET',
  FETCH_GAPI_START: 'FETCH_GAPI_START',
  FETCH_GAPI_COMPLETE: 'FETCH_GAPI_COMPLETE',
  FETCH_GAPI_ERROR: 'FETCH_GAPI_ERROR',
  GOOGLE_USER_AUTHORIZE_START: 'GOOGLE_USER_AUTHORIZE_START',
  GOOGLE_USER_AUTHORIZE_COMPLETE: 'GOOGLE_USER_AUTHORIZE_COMPLETE',
  GOOGLE_USER_AUTHORIZE_ERROR: 'GOOGLE_USER_AUTHORIZE_ERROR',
  FETCH_DOCS_START: 'FETCH_DOCS_START',
  FETCH_DOCS_COMPLETE: 'FETCH_DOCS_COMPLETE',
  FETCH_DOCS_ERROR: 'FETCH_DOCS_ERROR',
  FETCH_SET_START: 'FETCH_SET_START',
  FETCH_SET_COMPLETE: 'FETCH_SET_COMPLETE',
  FETCH_SET_ERROR: 'FETCH_SET_ERROR',
  SET_STUDY_TYPE: 'SET_STUDY_TYPE',
  SET_INPUT_TYPE: 'SET_INPUT_TYPE',
  GET_NEXT_CARD: 'GET_NEXT_CARD',
  TOGGLE_ANSWER: 'TOGGLE_ANSWER'
};

export const selectSet = id => ({
  type: Types.SELECT_SET,
  id
});

export const updateSet = cards => ({
  type: Types.UPDATE_SET,
  cards
});

export const markCardIncorrect = card => ({
  type: Types.MARK_CARD_INCORRECT,
  card
});

export const markCardCorrect = card => ({
  type: Types.MARK_CARD_CORRECT,
  timestamp: Date.now( ),
  card
});

export const fetchGAPI = ( ) => ({
  type: Types.FETCH_GAPI_START
});

export const fetchGAPIComplete = ( ) => ({
  type: Types.FETCH_GAPI_COMPLETE,
  gapiLoaded: true
});

export const fetchGAPIError = error => ({
  type: Types.FETCH_GAPI_ERROR,
  gapiLoaded: false,
  error
});

export const googleUserAuthorizeStart = (loginImmediate=false) => ({
  type: Types.GOOGLE_USER_AUTHORIZE_START,
  loginImmediate: loginImmediate
});

export const googleUserAuthorizeComplete = resp => ({
  type: Types.GOOGLE_USER_AUTHORIZE_COMPLETE,
  provider: 'google',
  resp
});

export const googleUserAuthorizeError = error => ({
  type: Types.GOOGLE_USER_AUTHORIZE_ERROR,
  provider: 'google',
  error
});

export const fetchDocs = searchQuery => ({
  type: Types.FETCH_DOCS_START,
  searchQuery
});

export const fetchDocsComplete = resp => ({
  type: Types.FETCH_DOCS_COMPLETE,
  resp
});

export const fetchDocsError = error => ({
  type: Types.FETCH_DOCS_ERROR,
  error
});

export const fetchSet = id => ({
  type: Types.FETCH_SET_START,
  id 
});

export const fetchSetComplete = resp => ({
  type: Types.FETCH_SET_COMPLETE,
  resp
});

export const fetchSetError = error => ({
  type: Types.FETCH_SET_ERROR,
  error
});

export const setStudyType = newType => ({
  type: Types.SET_STUDY_TYPE,
  newType
});

export const setActionType = newType => ({
  type: Types.SET_ACTION_TYPE,
  newType
});

export const getNextCard = ( ) => ({
  type: Types.GET_NEXT_CARD
});

export const toggleAnswer = ( ) => ({
  type: Types.TOGGLE_ANSWER
});
