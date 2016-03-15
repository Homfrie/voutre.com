import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  loading: false,
  isSignedIn: false,
  error: undefined,
  provider: "google",
  loginImmediate: false
});

export default function authReducer(state = initialState, action) {
  const {error, loginImmediate} = action;
  switch(action.type) {
    case Types.GOOGLE_USER_AUTHORIZE_START: 
      return state.merge({ loginImmediate, loading: true, error });
    case Types.GOOGLE_USER_AUTHORIZE_COMPLETE: 
      return state.merge({ isSignedIn: true, loading: false });
    case Types.GOOGLE_USER_AUTHORIZE_ERROR: 
      return state.merge({ isSignedIn: false, loading: false, error});
    default:
      return state;
  }
}
