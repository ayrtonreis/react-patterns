import { expect, test } from 'vitest'

test('my test', () => {
    const f = () => 2

    expect(f()).toBe(2)
})
