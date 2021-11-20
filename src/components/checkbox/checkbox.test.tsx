import * as React from 'react'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from '@testing-library/react-hooks'

import { Checkbox} from "./checkbox.component";

describe('Checkbox', () => {
    it('Uncontrolled: have checked if defaultValue === true', () => {
        render(<Checkbox testId="checkbox" defaultValue={true} />)
        expect(screen.getByTestId("checkbox")).toHaveClass('checked')
    })

    it('Uncontrolled: internal value was toggled after click', () => {
        render(<Checkbox testId="checkbox" defaultValue={true} />)

        fireEvent(screen.getByTestId("checkbox"), new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }))

        expect(screen.getByTestId("checkbox")).not.toHaveClass('checked')
    })

    it('Controlled: have checked if defaultValue === true', () => {
        render(<Checkbox testId="checkbox" value={true} />)
        expect(screen.getByTestId("checkbox")).toHaveClass('checked')
    })

    it('Controlled: checked after toggle without onChange prop', () => {
        render(<Checkbox testId="checkbox" value={true} />)

        fireEvent(screen.getByTestId("checkbox"), new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }))

        expect(screen.getByTestId("checkbox")).toHaveClass('checked')
    })

    it('Controlled: unchecked after toggle with onChange prop', () => {
        const { result } = renderHook(() => React.useState<boolean>(true))
        const [checked, setChecked] = result.current

        render(<Checkbox testId="checkbox" value={checked} onChange={value => setChecked(value)} />)

        fireEvent(screen.getByTestId("checkbox"), new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }))

        waitFor(() => {
            expect(checked).toBe(false)
        })
    })
})
