import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isLoaded: false,
  data: [ ],
  error: null,
  searchQuery: ""
});

export default function docsReducer(state = initialState, action) {
  const {resp, error, searchQuery} = action;
  switch(action.type) {
    case Types.FETCH_DOCS_START: 
      return state.merge({loading: true, error, searchQuery});
    case Types.FETCH_DOCS_COMPLETE:
      return state.merge({loading: false, isLoaded: true, data: resp.result.files});
    case Types.FETCH_DOCS_ERROR:
      return state.merge({loading: false, data: [ ], isLoaded: false, error});
    default:
      return state;
  }
}
