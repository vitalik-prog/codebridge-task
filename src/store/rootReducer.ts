import { combineReducers } from '@reduxjs/toolkit';
import { reducer as articlesReducer } from './articles';

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export default rootReducer;
