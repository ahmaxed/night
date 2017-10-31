import { LOAD_BARS, ADD_USER, REMOVE_USER } from '../actions/types';
//import isEmpty from 'lodash/isEmpty';

const initialState = {
  bars : null,
  barModel: null
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      case LOAD_BARS:
        return {
          bars: action.bars[0],
          barModel: action.bars[1]
        }
        case ADD_USER:
        return { ...state,
            barModel: {
              ...state.barModel,
              [action.bar.yelpId]: {
                ...state.barModel[action.bar.yelpId],
                users: [...state.barModel[action.bar.yelpId].users, action.info.userId]
              }
          }
        }
        case REMOVE_USER:
        const index = state.barModel[action.bar.yelpId].users.indexOf(action.info.userId);
        if (index >= 0)
          return { ...state,
            barModel: {
              ...state.barModel,
                [action.bar.yelpId]: {
                  ...state.barModel[action.bar.yelpId],
                  users: [...state.barModel[action.bar.yelpId].users.slice(0, index),
                   ...state.barModel[action.bar.yelpId].users.slice(index + 1)]
                }
              }
          }
        else {
          return state;
        }
      default: return state;
    }
}
