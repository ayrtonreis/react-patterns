import React from 'react'
import type { StoryFn } from '@storybook/react'

import { GlobalCalendarWrapper } from '../elements'

export const withLayout = (StoryComponent: StoryFn) => (
    <GlobalCalendarWrapper>
        <StoryComponent />
    </GlobalCalendarWrapper>
)
