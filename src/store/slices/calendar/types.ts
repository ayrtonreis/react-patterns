/**
 * @description Non-serializable entities (like Date objects) should not go into Redux
 *   Therefore, the stored timestamp will be its serializable representation (must be careful with TZ).
 */
export type Timestamp = string

export interface TaskEntry {
    id: string
    title: string
    category: 0 | 1 | 2
}

export interface DayEntry {
    day: Timestamp
    tasks: TaskEntry[]
}

export interface Day {
    day: number
    month: number
    year: number
}
