import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isSignedIn: false,
  error: null,
  data: { }
});

export default function authReducer(state = initialState, action) {
  const {error, resp} = action;
  switch(action.type) {
    case Types.USER_AUTHORIZE_START: 
      return state.merge({ loading: true, error });
    case Types.USER_AUTHORIZE_COMPLETE: 
      return state.merge({ 
        data: resp,
        isSignedIn: true, 
        loading: false 
      });
    case Types.USER_AUTHORIZE_ERROR: 
      return initialState.merge({ 
        error
      });
    default:
      return state;
  }
}
