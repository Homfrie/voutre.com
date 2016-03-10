import Immutable from 'immutable';
import {Types} from '../actions';
import {combineReducers} from 'redux-immutable';
import auth from './auth';
import gapi from './gapi';
import docs from './docs';
import routing from './routing';

//selectors
export const getSearchQuery = state => state.getIn(['docs', 'searchQuery']);
export const isLoginImmediate = state => state.getIn(['auth', 'loginImmediate']);
export const isGAPILoaded = state => state.getIn(['gapi', 'isLoaded']);

export default combineReducers({ 
  gapi,
  auth,
  docs,
  routing
});
