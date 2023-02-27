import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchManager } from './ActionCreators'

interface ManagerSlice {
  managerData: object | null
  isLoading: boolean
  error: string | null
}

const initialState: ManagerSlice = {
  managerData: null,
  isLoading: false,
  error: null,
}

export const managerSlice = createSlice({
  name: 'Manager',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchManager.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.error = null
      state.managerData = action.payload
    },
    [fetchManager.pending.type]: state => {
      state.isLoading = true
    },
    [fetchManager.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default managerSlice.reducer
