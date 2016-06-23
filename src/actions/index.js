import Immutable from 'immutable';

export const Types = {
  /*set*/
  SAVE_SET_START: 'SAVE_SET_START',
  SAVE_SET_COMPLETE: 'SAVE_SET_COMPLETE',
  SAVE_SET_ERROR: 'SAVE_SET_ERROR',

  FETCH_SET_START: 'FETCH_SET_START',
  FETCH_SET_COMPLETE: 'FETCH_SET_COMPLETE',
  FETCH_SET_ERROR: 'FETCH_SET_ERROR',

  FETCH_SETS_START: 'FETCH_SETS_START',
  FETCH_SETS_COMPLETE: 'FETCH_SETS_COMPLETE',
  FETCH_SETS_ERROR: 'FETCH_SETS_ERROR',

  /*card*/
  SAVE_CARD_START: 'SAVE_CARD_START',
  SAVE_CARD_COMPLETE: 'SAVE_CARD_COMPLETE',
  SAVE_CARD_ERROR: 'SAVE_CARD_ERROR',

  FETCH_CARD_START: 'FETCH_CARD_START',
  FETCH_CARD_COMPLETE: 'FETCH_CARD_COMPLETE',
  FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',

  GET_CARD: 'GET_CARD',

  MARK_CARD_CORRECT: 'MARK_CARD_CORRECT',
  MARK_CARD_INCORRECT: 'MARK_CARD_INCORRECT',

  GET_NEXT_CARD: 'GET_NEXT_CARD',
  TOGGLE_ANSWER: 'TOGGLE_ANSWER',

  /*study session*/
  SAVE_STUDY_SESSION_START: 'SAVE_STUDY_SESSION_START',
  SAVE_STUDY_SESSION_COMPLETE: 'SAVE_STUDY_SESSION_COMPLETE',
  SAVE_STUDY_SESSION_ERROR: 'SAVE_STUDY_SESSION_ERROR',

  SET_STUDY_SESSION_AS_CONTINUOUS: 'SET_STUDY_SESSION_AS_CONTINUOUS',
  SET_STUDY_TYPE: 'SET_STUDY_TYPE',
  SET_INPUT_TYPE: 'SET_INPUT_TYPE',

  START_AUTOSAVE: 'START_AUTOSAVE',
  STOP_AUTOSAVE: 'STOP_AUTOSAVE',

  /*user*/
  USER_AUTHORIZE_START: 'USER_AUTHORIZE_START',
  USER_AUTHORIZE_COMPLETE: 'USER_AUTHORIZE_COMPLETE',
  USER_AUTHORIZE_ERROR: 'USER_AUTHORIZE_ERROR'
};

export const markCardIncorrect = id => ({
  type: Types.MARK_CARD_INCORRECT,
  id
});

export const markCardCorrect = id => ({
  type: Types.MARK_CARD_CORRECT,
  timestamp: new Date( ),
  id
});

export const userAuthorize = (code) => ({
  type: Types.USER_AUTHORIZE_START,
  provider: 'facebook',
  code
});

export const userAuthorizeComplete = resp => ({
  type: Types.USER_AUTHORIZE_COMPLETE,
  resp
});

export const userAuthorizeError = error => ({
  type: Types.USER_AUTHORIZE_ERROR,
  provider: 'voutre',
  error
});

export const fetchSets = query => ({
  type: Types.FETCH_SETS_START,
  query 
});

export const fetchSetsComplete = resp => ({
  type: Types.FETCH_SETS_COMPLETE,
  resp
});

export const fetchSetsError = error => ({
  type: Types.FETCH_SETS_ERROR,
  error
});

export const fetchSet = (id, cardId) => ({
  type: Types.FETCH_SET_START,
  id, cardId
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
  type: Types.SAVE_STUDY_SESSION_START
});

export const saveStudySessionComplete = ( ) => ({
  type: Types.SAVE_STUDY_SESSION_COMPLETE
});

export const saveStudySessionError = ( ) => ({
  type: Types.SAVE_STUDY_SESSION_ERROR
});

export const saveSet = set => ({
  type: Types.SAVE_SET_START,
  set 
});

export const saveSetComplete = resp => ({
  type: Types.SAVE_SET_COMPLETE,
  resp
});

export const saveSetError = error => ({
  type: Types.SAVE_SET_ERROR,
  error
});

export const fetchCard = (setId, id) => ({
  type: Types.FETCH_CARD_START,
  setId, id
});

export const fetchCardComplete = ( ) => ({
  type: Types.FETCH_CARD_COMPLETE
});

export const fetchCardError = ( ) => ({
  type: Types.FETCH_CARD_ERROR
});

export const getCard = id => ({
  type: Types.GET_CARD,
  id
});

export const saveCard = card => ({
  type: Types.SAVE_CARD_START,
  card
});

export const saveCardComplete = ( ) => ({
  type: Types.SAVE_CARD_COMPLETE
});

export const saveCardError = ( ) => ({
  type: Types.SAVE_CARD_ERROR
});

export const startAutosave = ( ) => ({
  type: Types.START_AUTOSAVE
});

export const stopAutosave = ( ) => ({
  type: Types.STOP_AUTOSAVE
});
