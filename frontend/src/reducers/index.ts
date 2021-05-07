import { combineReducers } from 'redux';
import { authentication } from './AuthenticationReducer';
import { alert } from './AlertReducer';
import { board } from './BoardReducer';

const rootReducer = combineReducers({
  board,
  alert,
  authentication
});

export default rootReducer;
