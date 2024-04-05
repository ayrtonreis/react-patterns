import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'

import { Calendar } from '../index'
import { withLayout } from './WithLayout'
import { MockedStore } from './MockedStore'
import { mapSbArgsToState } from './utils'
import { CalendarPropsAndCustomArgs } from './types'
import { LOCATION_OPTIONS } from '../../../../../store/slices/calendar/types'

const meta: Meta<CalendarPropsAndCustomArgs> = {
    title: 'storybook-redux/Calendar',
    component: Calendar,
    decorators: [
        withLayout,
        (story, ctx) => {
            const [, updateArgs] = useArgs()

            return (
                <MockedStore
                    {...ctx}
                    calendarState={mapSbArgsToState(ctx.args)}
                    updateArgs={updateArgs}
                >
                    {story()}
                </MockedStore>
            )
        },
    ],
    argTypes: {
        locationId: { control: 'select', options: LOCATION_OPTIONS },
        today: {
            control: 'date',
        },
        targetDay: { control: 'date' },
        showSelectedDay: { name: 'showSelectedDay?', control: 'boolean' },
        selectedDay: {
            control: 'date',
            options: [null],
            if: { arg: 'showSelectedDay', truthy: true },
        },
        orderedDayEntries: { control: 'object' },
    },
}
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    decorators: [],
    args: {
        locationId: LOCATION_OPTIONS[0],
        today: new Date().toISOString(),
        targetDay: new Date().toISOString(),
        showSelectedDay: false,
        selectedDay: new Date().toISOString(),
        orderedDayEntries: [],
    },
}

export default meta
