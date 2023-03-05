import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchManager } from './ActionCreators'
import { ICard, IRoom } from '../../../utils/interfaces'

interface IData {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  rooms?: IRoom[]
}

interface ManagerSlice {
  data: IData
  isLoading: boolean
  error: string | null
}

const initialState: ManagerSlice = {
  data: {},
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
      state.data = action.payload
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
