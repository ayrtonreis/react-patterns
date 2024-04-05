import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { configureStore, createAction, createSlice, Middleware } from '@reduxjs/toolkit'

import { calendarSlice, CalendarState } from '../../../../../store/slices/calendar/slice'
import { mapStateToSbArgs, useDeepMemo } from './utils'
import { weatherApi } from '../../../../../store/api/weather'

const middleware: (updateArgs: (obj: object) => void) => Middleware =
    (updateArgs) => (store) => (next) => (action) => {
        const result = next(action)

        const state = store.getState().calendar
        updateArgs(mapStateToSbArgs(state))

        return result
    }

const applySbState = createAction<CalendarState>('applySbState')
/**
 * @description {https://storybook.js.org/tutorials/intro-to-storybook/react/en/data/}
 **/
export const MockedStore = ({
    calendarState,
    updateArgs,
    children,
}: {
    calendarState: CalendarState
    children: React.ReactNode
    updateArgs: (obj: object) => void
}) => {
    // Attention: using a state instead of a ref due to lazy initialization
    const [store] = useState(() =>
        configureStore({
            reducer: {
                calendar: createSlice({
                    name: 'calendar',
                    initialState: calendarState,
                    reducers: calendarSlice.caseReducers,
                    extraReducers: (builder) => {
                        builder.addCase(applySbState, (state, { payload }) => ({
                            ...state,
                            ...payload,
                        }))
                    },
                }).reducer,
                [weatherApi.reducerPath]: weatherApi.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware() //
                    .concat(weatherApi.middleware)
                    .concat(middleware(updateArgs)),
        })
    )

    useDeepMemo(() => {
        store.dispatch(applySbState(calendarState))
    }, calendarState)

    return <Provider store={store}>{children}</Provider>
}
