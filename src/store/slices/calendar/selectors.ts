import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../index'
import { aggregateItemsByCategory, findSorted, getDaysOfMonth } from './utils'

const selectCalendar = (state: RootState) => state.calendar

export const selectLocation = createSelector(selectCalendar, (state) => state.location)

export const selectTargetDay = createSelector(selectCalendar, (state) => state.targetDay)
export const selectToday = createSelector(selectCalendar, (state) => state.today)
export const selectTargetMonthValue = createSelector(selectTargetDay, (monthDate) =>
    new Date(monthDate).getUTCMonth()
)

export const selectTargetMonthItems = createSelector(
    selectCalendar,
    ({ targetDay: monthDate, orderedDayEntries }) => {
        const daysOfMonth = getDaysOfMonth(monthDate)
        const daysOfMonthExtended = daysOfMonth.map((week) =>
            week.map((dayEntry) => {
                const { day, month, year } = dayEntry
                const targetDate = new Date(year, month, day).toISOString()
                const tasks =
                    findSorted(orderedDayEntries, targetDate, (item) => item.day)?.tasks || []
                const taskCounterByCategory = aggregateItemsByCategory(tasks)

                return { ...dayEntry, taskCounterByCategory }
            })
        )

        return daysOfMonthExtended
    }
)

export const selectSelectedDay = createSelector(selectCalendar, (state) => state.selectedDay)
export const selectSelectedDayTasks = createSelector(
    selectCalendar,
    ({ orderedDayEntries, selectedDay }) => {
        const tasks = findSorted(orderedDayEntries, selectedDay, (item) => item.day)?.tasks
        return tasks || []
    }
)

export const selectTotalCounterForTargetMonth = createSelector(
    selectTargetDay,
    selectTargetMonthItems,
    (targetDate, currentMonthItems) => {
        const currentMonth = new Date(targetDate).getMonth()
        const items = currentMonthItems.flat().filter(({ month }) => month === currentMonth)
        const total = items.reduce((acc, day) => {
            return (
                acc + [...day.taskCounterByCategory.values()].reduce((sum, curr) => sum + curr, 0)
            )
        }, 0)

        return total
    }
)
