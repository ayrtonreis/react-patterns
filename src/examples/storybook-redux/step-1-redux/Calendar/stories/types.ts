import React from 'react'

import { Calendar } from '../index'
import { CalendarState } from '../../../../../store/slices/calendar/slice'

export type CalendarPropsAndCustomArgs = React.ComponentProps<typeof Calendar> &
    CalendarState & { showSelectedDay: boolean }
