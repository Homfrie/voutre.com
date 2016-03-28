import Immutable from 'immutable';

export const Types = {
  START_AUTOSAVE: 'START_AUTOSAVE',
  STOP_AUTOSAVE: 'STOP_AUTOSAVE',
  SAVE_STUDY_SESSION_START: 'SAVE_STUDY_SESSION_START',
  SAVE_STUDY_SESSION_COMPLETE: 'SAVE_STUDY_SESSION_COMPLETE',
  SAVE_STUDY_SESSION_ERROR: 'SAVE_STUDY_SESSION_ERROR',
  SET_STUDY_SESSION_AS_CONTINUOUS: 'SET_STUDY_SESSION_AS_CONTINUOUS',
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

export const updateSet = resp => ({
  type: Types.UPDATE_SET,
  resp 
});

export const markCardIncorrect = id => ({
  type: Types.MARK_CARD_INCORRECT,
  id
});

export const markCardCorrect = id => ({
  type: Types.MARK_CARD_CORRECT,
  timestamp: new Date( ),
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
  type: Types.GET_NEXT_CARD,
  timestamp: new Date( )
});

export const toggleAnswer = ( ) => ({
  type: Types.TOGGLE_ANSWER
});

export const setStudySessionAsContinuous = ( ) => ({
  type: Types.SET_STUDY_TYPE,
  studyType: 'continuous'
});

export const setStudySessionAsSpaced = ( ) => ({
  type: Types.SET_STUDY_TYPE,
  studyType: 'spaced'
});

export const saveStudySession = ( ) => ({
  type: Types.SAVE_STUDY_SESSION
});

export const saveStudySessionComplete = ( ) => ({
  type: Types.SAVE_STUDY_SESSION_COMPLETE
});

export const saveStudySessionError = ( ) => ({
  type: Types.SAVE_STUDY_SESSION_ERROR
});

export const startAutosave = ( ) => ({
  type: Types.START_AUTOSAVE
});

export const stopAutosave = ( ) => ({
  type: Types.STOP_AUTOSAVE
});
