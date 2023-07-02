import { combineReducers } from 'redux';

import listingsReducer from './slices/listingsSlice';

const rootReducer = combineReducers({
  listings: listingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
