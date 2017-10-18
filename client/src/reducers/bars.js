import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  bars : null
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      default: return state;
    }
}
