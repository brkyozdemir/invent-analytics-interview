import movieReducer from './movieReducer';
import { combineReducers } from 'redux';
import detailReducer from './detailReducer';

export default combineReducers({
  movieReducer,
  detailReducer
})