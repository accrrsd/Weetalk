import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomReducer from './reducers/RoomSlice'

const rootReducer = combineReducers({
  roomReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
