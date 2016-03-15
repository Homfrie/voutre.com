import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  studyType: "front",
  answerType: "input"
});

export default function studySessionReducer(state = initialState, action) {
  const {newType} = action;
  switch(action.type) {
    case Types.SET_STUDY_TYPE:
      return state.merge({studyType: newType});
    case Types.SET_ANSWER_TYPE: 
      return state.merge({answerType: newType});
    default:
      return state;
  }
}
