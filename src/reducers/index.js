import Immutable from 'immutable';
import {Types} from '../actions';
import {combineReducers} from 'redux-immutable';
import sets from './sets';
import set from './set';
import auth from './auth';
import studySession from './study-session';
import routing from './routing';

//selectors
export const getUserId = state => state.getIn(['auth', 'data', 'id']);
export const dispatch = state => state;

export default combineReducers({ 
  auth,
  sets,
  set,
  studySession,
  routing
});
