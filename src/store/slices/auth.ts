import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isLoggedIn: boolean,
  token?: string,
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer