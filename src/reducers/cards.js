import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const initialState = Immutable.fromJS({
  data: [ ],
  activeIndex: 0,
  showAnswer: false
});

export default function setReducer(state = initialState, action) {
  const {resp, error, id, timestamp} = action;
  switch(action.type) {
    case Types.FETCH_SET_COMPLETE:
      return state.merge({data: resp.cards});
    case Types.TOGGLE_ANSWER:
      return state.merge({showAnswer: !state.get('showAnswer')});
    case Types.GET_NEXT_CARD:
      return state.merge({
        showAnswer: false,
        activeIndex: (
          state.get('activeIndex') + 1) % state.get('data').count()
    });
    case Types.MARK_CARD_CORRECT:
      return state.merge({data: 
        state.get('data').update(
          state.get('data').findIndex( c => c.id == id ), 
            c => c.set({level: c.get('level') + 1, lastCorrectAt: timestamp}))});
    case Types.MARK_CARD_INCORRECT:
      return state.merge({data: 
        state.get('data').update(
          state.get('data').findIndex( c => c.id == id ), 
            c => c.set('level', c.get('level') - 1))});
    default:
      return state;
  }
}
