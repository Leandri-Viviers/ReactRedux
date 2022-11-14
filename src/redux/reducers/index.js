import { combineReducers } from 'redux';
// Reducers
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
