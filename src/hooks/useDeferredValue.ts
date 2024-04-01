import { useEffect, useRef } from 'react'
import { isNil } from 'lodash'

export function useDeferredValue<T>(value: T): T {
    const prevValue = useRef<T>()

    useEffect(() => {
        if (!isNil(value)) {
            prevValue.current = value
        }
    }, [value])

    return isNil(value) ? prevValue.current ?? value : value
}
