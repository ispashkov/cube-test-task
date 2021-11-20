import * as React from 'react'

type UseControlledProps<T = unknown> = {
    /**
     * Holds the component value when it's controlled.
     */
    controlled: T | undefined

    /**
     * The default value when uncontrolled.
     */
    defaultValue: T | undefined
}

type UseControlledReturn<T = unknown> = [T | undefined, (newValue: T | undefined) => void]

export function useControlled<T = unknown>(props: UseControlledProps<T>): UseControlledReturn<T> {
    const { controlled, defaultValue } = props

    const { current: isControlled } = React.useRef<boolean>(controlled !== undefined)
    const [valueInternal, setValueInternal] = React.useState<T | undefined>(defaultValue)
    const value = isControlled ? controlled : valueInternal

    const setValueIfUncontrolled = React.useCallback((newValue: T | undefined) => {
        if (!isControlled) {
            setValueInternal(newValue)
        }
    }, [isControlled])

    return [value, setValueIfUncontrolled]
}
