import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sortedIndexBy } from 'lodash'

import { findSorted } from './utils'

/**
 * @description Non-serializable entities (like Date objects) should not go into Redux
 *   Therefore, the stored timestamp will be its serializable representation (must be careful with TZ).
 */
type Timestamp = string

interface TaskEntry {
    id: string
    title: string
    category: 0 | 1 | 2
}

interface DayEntry {
    day: Timestamp
    tasks: TaskEntry[]
}

export interface CalendarState {
    today: Timestamp
    targetDay: Timestamp
    selectedDay: null | Timestamp
    orderedDayEntries: DayEntry[]
}

export const initialState: CalendarState = {
    today: '2024-04-02',
    targetDay: '2024-04-02',
    selectedDay: null,
    orderedDayEntries: [],
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setToday(state, { payload: today }: PayloadAction<Timestamp>) {
            state.today = today
        },
        goToNextMonth(state) {
            const date = new Date(state.targetDay)
            date.setMonth(date.getMonth() + 1, 1)
            state.targetDay = date.toISOString()
        },
        goToPreviousMonth(state) {
            const date = new Date(state.targetDay)
            date.setMonth(date.getMonth() - 1, 1)
            state.targetDay = date.toISOString()
        },
        addTaskEntry(
            state,
            {
                payload: { id, day, title, category },
            }: PayloadAction<
                Omit<TaskEntry, 'category'> & { day: Timestamp; category?: TaskEntry['category'] }
            >
        ) {
            const dayEntry = (() => {
                const items: Pick<DayEntry, 'day'>[] = state.orderedDayEntries

                const existingEntry = findSorted(state.orderedDayEntries, day, (v) => v.day)
                if (existingEntry) return existingEntry

                const indexToInsert = sortedIndexBy(items, { day }, (v) =>
                    new Date(v.day).getTime()
                )
                const newDayEntry = { day, tasks: [] }
                state.orderedDayEntries.splice(indexToInsert, 0, newDayEntry)

                return newDayEntry
            })()

            dayEntry.tasks.push({
                id,
                title,
                category: category ?? 0,
            })
        },
        removeTaskEntry(
            state,
            { payload: { day, id } }: PayloadAction<{ day: Timestamp; id: string }>
        ) {
            const dayEntry = findSorted(state.orderedDayEntries, day, (v) => v.day)
            if (dayEntry) {
                dayEntry.tasks = dayEntry.tasks.filter((task) => task.id !== id)
            }
        },
    },
})

export default calendarSlice.reducer

export const {
    setToday: setTodayAction,
    goToNextMonth: goToNextMonthAction,
    goToPreviousMonth: goToPreviousMonthAction,
    addTaskEntry: addTaskEntryAction,
    removeTaskEntry: removeTaskEntryAction,
} = calendarSlice.actions
