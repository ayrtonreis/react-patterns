/**
 * @description Non-serializable entities (like Date objects) should not go into Redux
 *   Therefore, the stored timestamp will be its serializable representation (must be careful with TZ).
 */
export type Timestamp = string

export type TaskCategory = 0 | 1 | 2
export const TASK_CATEGORY_VALUES: TaskCategory[] = [0, 1, 2]

export interface TaskEntry {
    id: string
    title: string
    category: TaskCategory
}

export interface DayEntry {
    day: Timestamp
    tasks: TaskEntry[]
}

export interface DayObj {
    day: number
    month: number
    year: number
}
