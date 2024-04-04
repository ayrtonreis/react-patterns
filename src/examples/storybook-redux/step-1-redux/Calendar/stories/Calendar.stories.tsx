import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from '../index'
import { CalendarState } from '../../../../../store/slices/calendar/slice'
import { withLayout } from './WithLayout'
import { MockedStore } from './MockedStore'

const meta = {
    title: 'storybook-redux/Calendar',
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
    args: {},
}
