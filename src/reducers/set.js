import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isLoaded: false,
  error: null,
  id: null
});

export default function setReducer(state = initialState, action) {
  const {resp, error, id} = action;
  switch(action.type) {
    case Types.FETCH_SET_START: 
      return state.merge({loading: true, error: null, id});
    case Types.FETCH_SET_COMPLETE:
      return state.merge({loading: false, isLoaded: true});
    case Types.FETCH_SET_ERROR:
      return state.merge({loading: false, data: null, isLoaded: false, error});
    default:
      return state;
  }
}
