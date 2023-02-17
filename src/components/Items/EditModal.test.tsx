import React from "react"
import EditModal from "./EditModal"
import { render, RenderOptions, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('editModal tests', () => {

    const onChange = jest.fn();
    const item = { name: 'testName', id: 1 }
    const initialState = { output: 10 }
    const mockStore = configureStore()
    let store

    test('find edited user', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><EditModal open={true} handleClose={onChange} item={item} action={'test'} editName={'test'} /></Provider>)
        expect(screen.getByDisplayValue('testName')).toBeInTheDocument()
    })
})
