import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DateNoTZ {
    day: number
    month: number
    year: number
}

interface CalendarState {
    today: DateNoTZ
}

const initialState: CalendarState = {
    today: { day: 30, month: 2, year: 2024 },
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setToday(state, { payload: today }: PayloadAction<DateNoTZ>) {
            state.today = today
        },
    },
})

export default calendarSlice.reducer

export const { setToday: setTodayAction } = calendarSlice.actions
