import type { Meta, StoryFn } from '@storybook/react'

import { Calendar } from './index'
import { GlobalCalendarWrapper } from './elements'

const withLayout = (StoryComponent: StoryFn) => (
    <GlobalCalendarWrapper>
        <StoryComponent />
    </GlobalCalendarWrapper>
)

const meta = {
    component: Calendar,
    decorators: [withLayout],
} satisfies Meta<typeof Calendar>

export default meta

export const Primary = () => <Calendar />
