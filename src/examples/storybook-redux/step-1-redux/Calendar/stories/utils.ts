import { useMemo, useRef } from 'react'
import { isEqual, isNil } from 'lodash'

import { CalendarState } from '../../../../../store/slices/calendar/slice'
import { CalendarPropsAndCustomArgs } from './types'

export function serializeDate(date: string | number | Date) {
    return new Date(date).toISOString()
}

export function mapSbArgsToState(args: CalendarPropsAndCustomArgs): CalendarState {
    return {
        ...args,
        today: serializeDate(args.today),
        targetDay: serializeDate(args.targetDay),
        selectedDay:
            args.showSelectedDay && args.selectedDay ? serializeDate(args.selectedDay) : null,
        orderedDayEntries: args.orderedDayEntries.map(({ day, ...item }) => ({
            ...item,
            day: serializeDate(day),
        })),
    }
}

export function mapStateToSbArgs(state: CalendarState) {
    return {
        ...state,
        // this remapping is necessary due to the way that the way SB controls handle null dates
        selectedDay: isNil(state.selectedDay) ? undefined : state.selectedDay,
        showSelectedDay: !isNil(state.selectedDay),
    }
}

export function useDeepMemo<T, D>(recipe: () => T, dependency: D): T {
    const cache = useRef<{ dependency: D; value: T }>()

    return useMemo(() => {
        if (cache.current && isEqual(cache.current.dependency, dependency)) {
            return cache.current.value
        }
        const newValue = recipe()
        cache.current = { dependency, value: newValue }
        return newValue
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency]) // Dependency array for useMemo
}
