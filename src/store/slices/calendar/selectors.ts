import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../index'
import { getDaysOfMonth } from './utils'

const selectCalendar = (state: RootState) => state.calendar

export const selectTargetDay = createSelector(selectCalendar, (state) => state.targetDay)

export const selectTargetMonth = createSelector(selectTargetDay, (monthDate) => {
    return getDaysOfMonth(monthDate)
})
