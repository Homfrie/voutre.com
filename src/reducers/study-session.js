import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  studyType: "spaced", //spaced|continuous
  cardOutputType: "front", //front|back|random
  answerType: "input"
});

export default function studySessionReducer(state = initialState, action) {
  const {studyType, cardOutputType, answerType} = action;
  switch(action.type) {
    case Types.SET_STUDY_TYPE:
      return state.merge({studyType});
    case Types.SET_ANSWER_TYPE: 
      return state.merge({answerType});
    case Types.SET_CARD_OUTPUT_TYPE: 
      return state.merge({cardOutputType});
    default:
      return state;
  }
}
