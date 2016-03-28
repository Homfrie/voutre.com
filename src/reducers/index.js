import Immutable from 'immutable';
import {Types} from '../actions';
import {combineReducers} from 'redux-immutable';
import set from './set';
import cards from './cards';
import auth from './auth';
import gapi from './gapi';
import docs from './docs';
import studySession from './study-session';
import routing from './routing';

//selectors
export const getSetId = state => state.getIn(['set', 'id']);
export const getSearchQuery = state => state.getIn(['docs', 'searchQuery']);
export const isLoginImmediate = state => state.getIn(['auth', 'loginImmediate']);
export const isGAPILoaded = state => state.getIn(['gapi', 'isLoaded']);
export const getCards = state => state.get('cards');
export const getSet = state => state.get('set');

export default combineReducers({ 
  gapi,
  auth,
  docs,
  set,
  cards,
  studySession,
  routing
});
