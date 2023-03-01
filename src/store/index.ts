import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomReducer from './reducers/Application/RoomSlice'
import managerReducer from './reducers/Organizer/ManagerSlice'

const rootReducer = combineReducers({
  roomReducer,
  managerReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
