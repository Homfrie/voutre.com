import Immutable from "immutable";
import { createReducer } from "redux-immutable";
import {Types} from "../actions";

const DAY_IN_MS = 86400000;
//Level 1-10 and the time in days between the appearence of each card.
const LEVEL_FACTOR = [0, 0, 1, 1, 2, 2, 3, 5, 10, 30];
const initialState = Immutable.fromJS({
  cards: [ ],
  name: null,
  id: null,
  activeIndex: null,
  showAnswer: false,
  isLoaded: false,
  error: null
});

const getNextLevelWhenIncorrect = (currentLevel) => {
  switch( currentLevel ) {
    case 0:
      return 0;
    case 1:
    case 2:
      return currentLevel-1;
    default:
      return currentLevel-2;
  }
};

//TODO: just rotate the array and do this functionally...
const getNextCardIndex = (cards, activeIndex, now) => {
  const count = cards.count( ),
    l = count + activeIndex,
    nowMs = now.getTime( ),
    laterCards = cards.slice(activeIndex+1);

  const nextCard = laterCards.findIndex( c => {
    return  LEVEL_FACTOR[c.get('level')] == 0 || 
      nowMs - c.get('lastCorrectAt').getTime() >= 
      LEVEL_FACTOR[c.get('level')] * DAY_IN_MS;
  });

  if( ~nextCard )
    return nextCard + activeIndex + 1;

  const earlierCards = cards.slice(0, activeIndex+1);
  return earlierCards.findIndex( c => {
    return LEVEL_FACTOR[c.get('level')] == 0 ||
      nowMs - c.get('lastCorrectAt').getTime() >= 
      LEVEL_FACTOR[c.get('level')] * DAY_IN_MS;
  });
};

/* 
 * card: {
 *  front: <string>,
 *  back: <string>,
 *  lastCorrectAt: <dateTime>, //defaults to null
 *  level: <int> //defaults to 0
 * }
 */

export default function setReducer(state = initialState, action) {
  const {resp, error, timestamp} = action;
  switch(action.type) {
    case Types.FETCH_SET_START:
      return initialState;
    case Types.FETCH_SET_COMPLETE:
      return state.merge({
        ...resp,
        isLoaded: true
      });
    case Types.SAVE_SET_COMPLETE:
      return initialState.merge({...resp});
    case Types.TOGGLE_ANSWER:
      return state.merge({showAnswer: !state.get('showAnswer')});
    case Types.GET_NEXT_CARD:
      return state.merge({
        showAnswer: false,
        activeIndex: getNextCardIndex(state.get('data'), 
                                      state.get('activeIndex'), 
                                      timestamp)
    });
    /*case Types.MARK_CARD_CORRECT:
      return state.merge({data: 
        state.get('data').update(
          state.get('data').findIndex( c => c.get('id') == id ), 
            c => c.set('level', c.get('level') + 1)
                  .set('lastCorrectAt', timestamp))});
    case Types.MARK_CARD_INCORRECT:
      return state.merge({data: 
        state.get('data').update(
          state.get('data').findIndex( c => c.id == id ), 
            c => c.set('level', 
              getNextLevelWhenIncorrect(c.get('level'))))});

    case Types.GET_CARD:
      return state.merge({
        activeIndex: state.get('cards').findIndex( c => c.id == id )
      });
     */
    default:
      return state;
  }
}
