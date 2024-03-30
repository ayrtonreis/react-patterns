import { configureStore } from '@reduxjs/toolkit'

import calendarReducer from './slices/calendar/slice'

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch