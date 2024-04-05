import { DayObj } from '../../../../store/slices/calendar/types'
import { WeatherByDate, WeatherConditionToEmoji } from '../../../../store/api/weather'

export function getLocalizedMonthYear(date: Date | string): string {
    const formatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })
    return formatter.format(new Date(date))
}

export function getLocalizedMonthDay(date: Date | string): string {
    const formatter = new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric' })
    return formatter.format(new Date(date))
}

export function getYear(date: Date | string): number {
    return new Date(date).getFullYear()
}

export function getStoreTimestamp({ year, month, day }: DayObj) {
    return new Date(year, month, day).toISOString()
}

export function getReducedTimeStamp({ year, month, day }: DayObj) {
    const format = (n: number) =>
        n.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })

    return `${year}-${format(month + 1)}-${format(day)}`
}

export function isSameDay(storeDate: string, localDate: DayObj) {
    const a = new Date(storeDate)
    const b = new Date(localDate.year, localDate.month, localDate.day)

    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    )
}

export function getWeatherEmoji(mapping: WeatherByDate | undefined, day: DayObj) {
    const condition = mapping?.[getReducedTimeStamp(day)]?.weatherCondition

    const emoji = condition && WeatherConditionToEmoji[condition]

    return emoji ? { condition, emoji } : null
}
