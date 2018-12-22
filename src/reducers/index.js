import { combineReducers } from 'redux';

import usersReducer from './users';
import graphDataReducer from './graphdata';

export default combineReducers({
  usersReducer,
  graphDataReducer
});
