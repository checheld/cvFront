import React from "react"
import ChipSelect from "./ChipSelect"
import { render, RenderOptions, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ITechnology } from "../../interfaces";

describe('ChipSelect tests', () => {

    const onChange = jest.fn();
    //const tech = [{ name: 'testName1', id: '1', type: 'CRM' }, { name: 'testName2', id: '2', type: 'Application' }, { name: 'testName3', id: '3', type: 'Web Tool' }]
    const tech: any = []
    const initialState = {
        technologies: {
            technologies: [
                {
                    "name": "Bootstrap",
                    "type": "front-end",
                    "projectList": [],
                    "userList": [],
                    "id": 2,
                    "createdAt": "0001-01-01T00:00:00"
                },
                {
                    "name": "CSS",
                    "type": "front-end",
                    "projectList": [],
                    "userList": [],
                    "id": 4,
                    "createdAt": "0001-01-01T00:00:00"
                },
                {
                    "name": "Java Script",
                    "type": "front-end",
                    "projectList": [],
                    "userList": [],
                    "id": 11,
                    "createdAt": "0001-01-01T00:00:00"
                },
            ]
        }
    }
    const mockStore = configureStore()
    let store

    test('find edited user', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><ChipSelect tech={tech} setTech={onChange} check={true} /></Provider>)
        userEvent.click(screen.getByText(/Select technologies/i))
        userEvent.click(screen.getByText(/Java Script/i))
        expect(screen.getByText(/Select technologies/i)).toBeNull()
    })
})
