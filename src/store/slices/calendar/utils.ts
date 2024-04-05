import {
    Coordinates,
    DayObj,
    LocationOptions,
    TASK_CATEGORY_VALUES,
    TaskCategory,
    TaskEntry,
} from './types'

export function findSorted<T, V>(items: T[], target: V, getter: (item: T) => V): T | undefined {
    let left = 0
    let right = items.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midValue = items[mid]

        if (getter(midValue) === target) {
            return items[mid]
        }
        if (getter(midValue) < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return undefined
}

export function getDaysOfMonth(dateStr: string): DayObj[][] {
    const targetDate = new Date(dateStr)
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth()

    // First and last day of the month
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // Adjust to include the first Sunday before the first day of the month
    const startDay = new Date(firstDayOfMonth)
    startDay.setDate(startDay.getDate() - startDay.getDay())

    // Adjust to include the last Saturday after the last day of the month
    const endDay = new Date(lastDayOfMonth)
    endDay.setDate(endDay.getDate() + (6 - endDay.getDay()))

    const weeks: DayObj[][] = []
    const currentDay = new Date(startDay)

    while (currentDay <= endDay) {
        const week: DayObj[] = []
        for (let i = 0; i < 7; i++) {
            week.push({
                day: currentDay.getDate(),
                month: currentDay.getMonth(), // Note: month is 0-indexed
                year: currentDay.getFullYear(),
            })
            currentDay.setDate(currentDay.getDate() + 1)
        }
        weeks.push(week)
    }

    return weeks
}

export function aggregateItemsByCategory(tasks: TaskEntry[]): Map<TaskCategory, number> {
    const map = tasks.reduce(
        (acc, task) => {
            const prev = acc.get(task.category)
            if (prev !== undefined) {
                acc.set(task.category, prev + 1)
            }

            return acc
        },
        new Map<TaskCategory, number>(TASK_CATEGORY_VALUES.map((v) => [v, 0]))
    )

    return map
}

const CoordinatesById: Record<LocationOptions, Coordinates> = {
    Porsgrunn: { latitude: 59.1386, longitude: 9.6555 },
    Rio: { latitude: 22.9068, longitude: 43.1729 },
    'New York': { latitude: 40.7128, longitude: 74.006 },
}

export function mapLocationIdToCoordinates(id: string): Coordinates | undefined {
    return CoordinatesById?.[id as LocationOptions]
}

export function mapCoordinatesToLocationId(location: Coordinates | undefined): string | undefined {
    const { latitude, longitude } = location || {}
    return Object.entries(CoordinatesById).find(
        ([, item]) => item.latitude === latitude && item.longitude === longitude
    )?.[0]
}
