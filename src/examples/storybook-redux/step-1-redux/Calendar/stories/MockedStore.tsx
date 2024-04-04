import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

import { calendarSlice, CalendarState } from '../../../../../store/slices/calendar/slice'

/**
 * @description {https://storybook.js.org/tutorials/intro-to-storybook/react/en/data/}
 **/
export const MockedStore = ({
    calendarState,
    children,
}: {
    calendarState: CalendarState
    children: React.ReactNode
}) => (
    <Provider
        store={configureStore({
            reducer: {
                calendar: createSlice({
                    name: 'calendar',
                    initialState: calendarState,
                    reducers: calendarSlice.caseReducers,
                }).reducer,
            },
        })}

        // store={configureStore({
        // // @ts-expect-error - Object literal may only specify known properties
        //     reducer: { calendar: calendarReducer },
        //     preloadedState: calendarState,
        // })}
    >
        {children}
    </Provider>
)
