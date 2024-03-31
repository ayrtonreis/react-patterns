import { describe, expect, it } from 'vitest'

import { findSorted } from './utils'

describe('findSorted', () => {
    it('should find element through binary search', () => {
        expect(findSorted([-10, -1, 0, 10, 100], 0, (v) => v)).toEqual(0)
        expect(findSorted([{ value: 1 }, { value: 2 }], 2, (v) => v.value)).toEqual({ value: 2 })
    })

    it('should return undefined', () => {
        expect(findSorted([-10, -1, 0, 10, 100], 1, (v) => v)).toEqual(undefined)
        expect(findSorted([{ value: 1 }, { value: 2 }], 0, (v) => v.value)).toEqual(undefined)
        expect(findSorted([], 1, (v) => v)).toEqual(undefined)
    })
})
