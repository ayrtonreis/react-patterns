import React from 'react'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

import { Calendar } from './index'
import { GlobalCalendarWrapper } from './elements'
import { CalendarState } from '../../../../store/slices/calendar/slice'

const withLayout = (StoryComponent: StoryFn) => (
    <GlobalCalendarWrapper>
        <StoryComponent />
    </GlobalCalendarWrapper>
)

/**
 * @description {https://storybook.js.org/tutorials/intro-to-storybook/react/en/data/}
 **/
const MockedStore = ({
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
                    reducers: {},
                }).reducer,
            },
        })}
    >
        {children}
    </Provider>
)

const meta = {
    component: Calendar,
    decorators: [withLayout],
} satisfies Meta<typeof Calendar>
export default meta

const MockedState: CalendarState = {
    today: '2024-04-02',
    targetDay: '2024-04-02',
    selectedDay: null,
    orderedDayEntries: [],
}

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    decorators: [(story) => <MockedStore calendarState={MockedState}>{story()}</MockedStore>],
}
