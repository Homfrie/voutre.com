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
  FETCH_DOCS_ERROR: 'FETCH_DOCS_ERROR'
};

export const selectSet = id => ({
  type: Types.SELECT_SET,
  id
});

export const updateSet = cards => ({
  type: Types.UPDATE_SET,
  cards
});

export const markCardIncorrect = id => ({
  type: Types.MARK_CARD_INCORRECT,
  id 
});

export const markCardCorrect = id => ({
  type: Types.MARK_CARD_CORRECT,
  id 
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

export const googleUserAuthorizeStart = (immediate=false) => ({
  type: Types.GOOGLE_USER_AUTHORIZE_START,
  loginImmediate: immediate 
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
