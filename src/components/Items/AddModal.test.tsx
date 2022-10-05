import React from "react"
import AddModal from "./AddModal"
import { render, RenderOptions, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('addModal tests', () => {

    const onChange = jest.fn();
    const initialState = { output: 10 }
    const mockStore = configureStore()
    let store

    const delInputButton = screen.queryByTestId('delInputButton')

    test('find delInputButton', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><AddModal open={true} handleClose={onChange} action={'test'} addName={'test'} /></Provider >)

        expect(delInputButton).toBeNull();
    })

    test('input is adding', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><AddModal open={true} handleClose={onChange} action={'test'} addName={'test'} /></Provider >)
        userEvent.click(screen.getByText('+ Add test'))

        expect((screen.getAllByPlaceholderText('test name'))).toHaveLength(2);
        expect(screen.getByTestId('delInputButton')).toBeInTheDocument();
    })

    test('added input is removing', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><AddModal open={true} handleClose={onChange} action={'test'} addName={'test'} /></Provider >)
        userEvent.click(screen.getByText('+ Add test'))
        userEvent.click(screen.getByTestId('delInputButton'))

        expect((screen.getAllByPlaceholderText('test name'))).toHaveLength(1);
        expect(delInputButton).toBeNull();
    })
})
