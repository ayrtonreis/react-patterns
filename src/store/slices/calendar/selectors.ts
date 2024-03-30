import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../index'

const selectCalendar = (state: RootState) => state.calendar

export const selectToday = createSelector(selectCalendar, (state) => state.today)
