import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth'
import bars from './reducers/bars'

export default combineReducers({
  flashMessages,
  auth,
  bars
});
