import { configureStore } from '@reduxjs/toolkit'

import calendarReducer from './slices/calendar/slice'
import { weatherApi } from './api/weather'

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware() //
            .concat(weatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
