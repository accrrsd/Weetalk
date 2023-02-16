import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomSlice {
  room: string | null
}

const initialState: RoomSlice = {
  room: null,
}

export const roomSlice = createSlice({
  name: 'Room',
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<string>) {
      state.room = action.payload
    },
  },
})

export const { setRoom } = roomSlice.actions
export default roomSlice.reducer
