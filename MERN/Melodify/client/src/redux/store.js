import { combineReducers } from 'redux'
import { alertsSlice } from './alertsSlice'
import { userSlice } from './userSlice'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    alerts : alertsSlice.reducer,
    user : userSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
