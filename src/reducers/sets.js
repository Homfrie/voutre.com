import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isLoaded: false,
  error: null,
  data: [ ],
  query: "",
  lastModifiedAt: null
});

export default function setsReducer(state = initialState, action) {
  const {resp, error, query} = action;
  switch(action.type) {
    case Types.FETCH_SETS_START: 
      return state.merge({loading: true, error: null, query});
    case Types.FETCH_SETS_COMPLETE:
      return state.merge({loading: false, isLoaded: true, data: resp, lastModifiedAt: resp.lastModifiedAt});
    case Types.FETCH_SETS_ERROR:
      return state.merge({loading: false, data: null, isLoaded: false, error});
    default:
      return state;
  }
}
