import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './index'
import { GlobalCalendarWrapper } from './elements'

const meta = {} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render: () => (
        <GlobalCalendarWrapper>
            <Calendar />
        </GlobalCalendarWrapper>
    ),
}
