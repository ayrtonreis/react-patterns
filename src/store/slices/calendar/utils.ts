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
