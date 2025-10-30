import { createSlice } from '@reduxjs/toolkit'
import type { ChatTicket } from '../../types/Slices'

export interface BaseState {
  selectedTicket: ChatTicket | null
  hasAutoOpened: boolean
}

const initialState: BaseState = {
  selectedTicket: null,
  hasAutoOpened: false
}

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setSelectedTicket(state, action) {
      state.selectedTicket = action.payload
    },
    setHasAutoOpened(state, action) {
      state.hasAutoOpened = action.payload
    },
    unsetBase (state) {
      state.selectedTicket = null
      state.hasAutoOpened = false
    }

  }
})

export const { setSelectedTicket, unsetBase, setHasAutoOpened } = baseSlice.actions
export default baseSlice.reducer
