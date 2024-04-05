import { useMemo, useRef } from 'react'
import { isEqual, isNil } from 'lodash'

import { CalendarState, initialState } from '../../../../../store/slices/calendar/slice'
import { CalendarPropsAndCustomArgs } from './types'
import {
    mapCoordinatesToLocationId,
    mapLocationIdToCoordinates,
} from '../../../../../store/slices/calendar/utils'

export function serializeDate(date: string | number | Date) {
    return new Date(date).toISOString()
}

export function mapSbArgsToState({
    locationId,
    ...args
}: CalendarPropsAndCustomArgs): CalendarState {
    const location = mapLocationIdToCoordinates(locationId)
    return {
        ...args,
        today: serializeDate(args.today),
        targetDay: serializeDate(args.targetDay),
        selectedDay: args.showSelectedDay
            ? serializeDate(args.selectedDay ? args.selectedDay : new Date().toISOString())
            : null,
        orderedDayEntries: args.orderedDayEntries.map(({ day, ...item }) => ({
            ...item,
            day: serializeDate(day),
        })),
        location: location || initialState.location,
    }
}

export function mapStateToSbArgs(state: CalendarState): Partial<CalendarPropsAndCustomArgs> {
    return {
        ...state,
        // this remapping is necessary due to the way that the way SB controls handle null dates
        selectedDay: isNil(state.selectedDay) ? null : state.selectedDay,
        showSelectedDay: !isNil(state.selectedDay),
        locationId: mapCoordinatesToLocationId(state.location),
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
