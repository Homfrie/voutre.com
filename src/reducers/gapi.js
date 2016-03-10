import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isLoaded: false,
  error: null
});

export default function gapiReducer(state = initialState, action) {
  const {error} = action;
  switch(action.type) {
    case Types.FETCH_GAPI_START: 
      return state.set('loading', true);
    case Types.FETCH_GAPI_COMPLETE:
      return state.merge({loading: false, isLoaded: true});
    case Types.FETCH_GAPI_ERROR:
      return state.merge({loading: false, isLoaded: false, error});
    default:
      return state;
  }
}
