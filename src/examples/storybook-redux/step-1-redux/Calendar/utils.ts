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
