import { combineReducers } from 'redux';

import { appReducer } from './app/reducers';
import { userReducer } from "src/store/user/reducers";

export default combineReducers({
  app: appReducer,
  user: userReducer
});
