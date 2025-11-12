import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { userSlice } from './slices/user'
import { baseSlice } from './slices/base'
import { agentSlice } from './slices/agent'
import { guestSlice } from './slices/guest'
import { tribet_api } from '../services/service'
import localforage from 'localforage'
// Root reducer
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  // Slices
  auth: authSlice.reducer,
  user: userSlice.reducer,
  agent: agentSlice.reducer,
  base: baseSlice.reducer,
  guest: guestSlice.reducer,
  // RTK Query APIs
  [tribet_api.reducerPath]: tribet_api.reducer,
});

const persistConfig = {
  key: 'root',
  storage: localforage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(tribet_api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);
export { persistor };

