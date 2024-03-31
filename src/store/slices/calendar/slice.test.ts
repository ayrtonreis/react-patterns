import { describe, it, expect } from 'vitest'

import calendarReducer, { initialState, addTaskEntryAction, removeTaskEntryAction } from './slice'

describe('addTaskEntry', () => {
    it('should insert a task into existing date', () => {
        const action = addTaskEntryAction({ id: '001', day: '2024-01-01', title: 'task' })
        const prevState = { ...initialState, orderedDayEntries: [] }
        const expectedState = {
            ...initialState,
            orderedDayEntries: [
                {
                    day: '2024-01-01',
                    tasks: [{ id: '001', title: 'task', category: 0 }],
                },
            ],
        }

        expect(calendarReducer(prevState, action)).toEqual(expectedState)
    })

    it('should insert a task into an existing created date', () => {
        const action = addTaskEntryAction({ id: '001', day: '2024-01-01', title: 'second' })
        const prevState = {
            ...initialState,
            orderedDayEntries: [
                { day: '2024-01-01', tasks: [{ id: '000', title: 'first', category: 1 as const }] },
            ],
        }
        const expectedState = {
            ...initialState,
            orderedDayEntries: [
                {
                    day: '2024-01-01',
                    tasks: [
                        { id: '000', title: 'first', category: 1 },
                        { id: '001', title: 'second', category: 0 },
                    ],
                },
            ],
        }

        expect(calendarReducer(prevState, action)).toEqual(expectedState)
    })

    it('should remove a task', () => {
        const action = removeTaskEntryAction({ id: '000', day: '2024-01-01' })
        const prevState = {
            ...initialState,
            orderedDayEntries: [
                { day: '2024-01-01', tasks: [{ id: '000', title: 'first', category: 1 as const }] },
            ],
        }
        const expectedState = {
            ...initialState,
            orderedDayEntries: [
                {
                    day: '2024-01-01',
                    tasks: [],
                },
            ],
        }

        expect(calendarReducer(prevState, action)).toEqual(expectedState)
    })
})
