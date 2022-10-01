import React from "react"
import ModalInput from "./ModalInput"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

describe('input tests', () => {

    const onChange = jest.fn();

    test('placeholder test', () => {
        render(<ModalInput placeholder={'test'} index={0} check={true} inputLength={5}/>)
        const helperText = screen.getByText(/Empty/i)
        expect(helperText).toBeInTheDocument()
        //screen.debug()
    })

    test('onChange works', () => {
        render(<ModalInput placeholder={'test'} setItem={onChange} inputLength={10}/>)
        userEvent.type(screen.getByRole('textbox'), 'SomeText')
        expect(onChange).toHaveBeenCalledTimes(8)

    })
})
