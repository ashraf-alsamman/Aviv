import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import listingsReducer from './slices/listingsSlice';

const rootReducer: Reducer = combineReducers({
  listings: listingsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
