import { combineReducers } from 'redux';
// Reducers
import courses from './courseReducer';

const rootReducer = combineReducers({
  courses,
});

export default rootReducer;
