import { createAsyncThunk } from '@reduxjs/toolkit'
import { getManager } from '../../../utils/api'

export const fetchManager = createAsyncThunk(
  'manager/fetchManager',
  async (_, thunkAPI) => {
    try {
      const response = await getManager()
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить пользователя')
    }
  }
)
