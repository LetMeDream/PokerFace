import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { userSlice } from './slices/user'
import { chatProfileSlice } from './slices/chat_profile'
import { mockApi } from '../services/service'

export const store = configureStore({
  reducer: {
    // Slices
    auth: authSlice.reducer,
    user: userSlice.reducer,
    chatProfile: chatProfileSlice.reducer,
    // RTK Query APIs
    [mockApi.reducerPath]: mockApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch