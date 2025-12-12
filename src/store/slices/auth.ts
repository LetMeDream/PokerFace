import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isLoggedIn: boolean,
  keepLoggedIn?: boolean,
  token: {
    access: string,
    refresh: string
  }
}

const initialState: AuthState = {
  isLoggedIn: false,
  keepLoggedIn: false,
  token: {
    access: '',
    refresh: ''
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = { access: '', refresh: '' }
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setKeepLoggedIn: (state, action) => {
      state.keepLoggedIn = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setToken, setKeepLoggedIn } = authSlice.actions

export default authSlice.reducer