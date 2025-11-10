import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isLoggedIn: boolean,
  token: string,
  /* Id for the guest comming from the ContactForm component */
  guestSessionId: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  guestSessionId: ''
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
      state.token = ''
      state.guestSessionId = ''
    },
    setGuestSessionId: (state, action) => {
      state.guestSessionId = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setGuestSessionId } = authSlice.actions

export default authSlice.reducer