import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sortedIndexBy } from 'lodash'

import { findSorted } from './utils'
import { DayEntry, TaskEntry, Timestamp } from './types'

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
        setSelectedDay(state, { payload: date }: PayloadAction<Timestamp | null>) {
            state.selectedDay = date
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
                payload: { id, title, category },
            }: PayloadAction<Omit<TaskEntry, 'category'> & { category?: TaskEntry['category'] }>
        ) {
            const day = state.selectedDay
            if (!day) return state

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
        removeTaskEntry(state, { payload: { id } }: PayloadAction<{ id: string }>) {
            const day = state.selectedDay
            if (!day) return state

            const dayEntry = findSorted(state.orderedDayEntries, day, (v) => v.day)
            if (dayEntry) {
                dayEntry.tasks = dayEntry.tasks.filter((task) => task.id !== id)
            }
        },
        setTaskCategory(
            state,
            {
                payload: { id, category },
            }: PayloadAction<{ id: string; category: TaskEntry['category'] }>
        ) {
            const day = state.selectedDay
            if (!day) return state

            const dayEntry = findSorted(state.orderedDayEntries, day, (v) => v.day)
            if (!dayEntry) return state

            const task = dayEntry.tasks.find((t) => t.id === id)
            if (task) {
                task.category = category
            }
        },
    },
})

export default calendarSlice.reducer

export const {
    setSelectedDay: setSelectedDayAction,
    goToNextMonth: goToNextMonthAction,
    goToPreviousMonth: goToPreviousMonthAction,
    addTaskEntry: addTaskEntryAction,
    removeTaskEntry: removeTaskEntryAction,
    setTaskCategory: setTaskCategoryAction,
} = calendarSlice.actions
