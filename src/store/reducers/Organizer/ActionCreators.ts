import { createAsyncThunk } from '@reduxjs/toolkit'
import { getManager } from '../../../utils/api'

export const fetchManager = createAsyncThunk(
  'manager/fetchManager',
  async (_, thunkAPI) => {
    let response = await getManager()
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        `${response.status} ${response.statusText}`
      )
    } else {
      return response.json()
    }
  }
)
