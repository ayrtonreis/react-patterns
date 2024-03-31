import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * @description Non-serializable entities (like Date objects) should not go into Redux
 *   Therefore, the stored timestamp will be its serializable representation (must be careful with TZ).
 */
type Timestamp = string

interface TaskEntry {
    category: 0 | 1 | 2
    title: string
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

const initialState: CalendarState = {
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
    },
})

export default calendarSlice.reducer

export const { setToday: setTodayAction } = calendarSlice.actions
