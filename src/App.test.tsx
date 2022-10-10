import React from "react"
import App from "./App"
import { render, RenderOptions, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('router tests', () => {

    const initialState = {
        CVs: {
            CVs: [{
                cvName: "CV Grigoriy Petrov",
                userId: 7,
                user: {
                    firstName: "Grigoriy",
                    lastName: "Petrov",
                    description: "Ряд методов Linq позволяют работать с результатами выборки как со множествами, производя операции на объединение, пересечение, разность двух выборок.  Но перед использованием данных методов надо учитывать, что они проводятся над однородными выборками с одинаковым определением строк, то есть которые совпадают по составу столбцов.  Для примеров возьмем модели из прошлых тем",
                    photoUrl: "https://res.cloudinary.com/dxyd7xncg/image/upload/v1660832520/jlvoo95hr0ui4lxgberg.jpg",
                    photoParamsId: 15,
                    photoParams: null,
                    educationList: [],
                    workExperienceList: [],
                    technologyList: [],
                    id: 7,
                    createdAt: "0001-01-01T00:00:00"
                },
                projectCVList: [
                    {
                        projectId: 51,
                        project: {
                            name: "Affilify",
                            description: "The learning platform with the opportunity to keep the progress for Experts, Students, Affiliate and Admin.",
                            projectTypeId: 8,
                            projectType: null,
                            country: "Austria",
                            link: "https://africansafarigroup.it",
                            photoList: [],
                            technologyList: [],
                            cvProjectCVList: [],
                            id: 51,
                            createdAt: "0001-01-01T00:00:00"
                        },
                        position: "dev",
                        description: "При этом мы не можем объединить две разнородные выборки, например, таблицу, пользователей и таблицу компаний. Однако уместна следующая запись",
                        startDate: "2022-08-03",
                        endDate: "2022-08-17",
                        cvId: 12,
                        cv: null,
                        id: 17,
                        createdAt: "0001-01-01T00:00:00"
                    }
                ],
                id: 12,
                createdAt: "2022-08-18T14:25:59.150817Z"
            }],
            isLoading: {
                get: false,
                getAll: false,
                add: false,
                delete: false,
                edit: false,
                search: false
            },
            result: {
                add: null,
                delete: null,
                edit: null,
                search: null,
            }
        },
        users: {
            users: [
                {
                    "firstName": "Grigoriy",
                    "lastName": "Petrov",
                    "description": "Ряд методов Linq позволяют работать с результатами выборки как со множествами, производя операции на объединение, пересечение, разность двух выборок.  Но перед использованием данных методов надо учитывать, что они проводятся над однородными выборками с одинаковым определением строк, то есть которые совпадают по составу столбцов.  Для примеров возьмем модели из прошлых тем",
                    "photoUrl": "https://res.cloudinary.com/dxyd7xncg/image/upload/v1660832520/jlvoo95hr0ui4lxgberg.jpg",
                    "photoParamsId": 15,
                    "photoParams": {
                        "scale": 1,
                        "positionX": 0.7916666667,
                        "positionY": 0.4416666667,
                        "id": 15,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    "educationList": [
                        {
                            "universityId": 1,
                            "university": null,
                            "speciality": "developer",
                            "startDate": "2014-02-03",
                            "endDate": "2019-06-25",
                            "userId": 7,
                            "user": null,
                            "id": 7,
                            "createdAt": "2022-08-18T14:23:38.545026Z"
                        }
                    ],
                    "workExperienceList": [
                        {
                            "companyId": 5,
                            "company": null,
                            "position": "dev",
                            "startDate": "2019-02-05",
                            "endDate": "2022-08-18",
                            "description": "Метод Union в качестве параметра принимает результаты второй выборки и объединяет ее с исходной. В результате мы получим два подзапроса SQL, результаты которых объединяются в общий набор",
                            "userId": 7,
                            "user": null,
                            "id": 8,
                            "createdAt": "2022-08-18T14:23:38.817141Z"
                        }
                    ],
                    "technologyList": [
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
                        {
                            "name": "C#",
                            "type": "back-end",
                            "projectList": [],
                            "userList": [],
                            "id": 22,
                            "createdAt": "2022-08-18T14:05:02.956096Z"
                        },
                        {
                            "name": "Ruby on Rails",
                            "type": "back-end",
                            "projectList": [],
                            "userList": [],
                            "id": 24,
                            "createdAt": "2022-08-18T14:05:02.956107Z"
                        },
                        {
                            "name": "PostgreSQL",
                            "type": "databases",
                            "projectList": [],
                            "userList": [],
                            "id": 26,
                            "createdAt": "2022-08-18T14:05:39.624558Z"
                        },
                        {
                            "name": "Sense of humor",
                            "type": "soft skills",
                            "projectList": [],
                            "userList": [],
                            "id": 31,
                            "createdAt": "2022-08-18T14:11:59.256262Z"
                        }
                    ],
                    "id": 7,
                    "createdAt": "0001-01-01T00:00:00"
                }
            ],
            isLoading: {
                get: false,
                getAll: false,
                add: false,
                delete: false,
                edit: false,
                search: false
            },
            result: {
                add: null,
                delete: null,
                edit: null,
                search: null,
            }
        },
        projects: {
            projects: [
                {
                    "id": 51,
                    "name": "Affilify",
                    "description": "The learning platform with the opportunity to keep the progress for Experts, Students, Affiliate and Admin.",
                    "projectTypeId": 8,
                    "projectType": {
                        "name": "CRM",
                        "projectProjectTypeList": [],
                        "id": 8,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    "country": "Austria",
                    "link": "https://africansafarigroup.it",
                    "photoList": [
                        {
                            "projectId": 51,
                            "project": null,
                            "url": "https://res.cloudinary.com/dxyd7xncg/image/upload/v1661503095/o6e7cg3ez8w5i3ge2gcm.jpg",
                            "id": 63,
                            "createdAt": "2022-08-26T08:38:20.345631Z"
                        },
                        {
                            "projectId": 51,
                            "project": null,
                            "url": "https://res.cloudinary.com/dxyd7xncg/image/upload/v1658833243/vyylcmsf2jxolls33obd.jpg",
                            "id": 62,
                            "createdAt": "2022-08-26T08:38:20.199798Z"
                        }
                    ],
                    "technologyList": [
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
                        {
                            "name": "C#",
                            "type": "back-end",
                            "projectList": [],
                            "userList": [],
                            "id": 22,
                            "createdAt": "2022-08-18T14:05:02.956096Z"
                        }
                    ]
                }
            ],
            isLoading: {
                get: false,
                getAll: false,
                add: false,
                delete: false,
                edit: false,
                search: false,
            },
            result: {}
        }
    }


    const mockStore = configureStore()
    let store

    afterAll(() => {
        window.sessionStorage.removeItem('oidc.user: https://identity-server-1.herokuapp.com:leviossacv')
    })

    test('login page', () => {
        store = mockStore(initialState)
        render(<App />)

        expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    })

    test('CV page renders,users page opens', () => {
        store = mockStore(initialState)
        window.sessionStorage.setItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv', '{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzM0U1MzRCRTc4QzAwQ0QyRDkxOEMwRDQ5RUQxRTg1IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXNlcnZlci0xLmhlcm9rdWFwcC5jb20iLCJuYmYiOjE2NjQ4NzYyMTYsImlhdCI6MTY2NDg3NjIxNiwiZXhwIjoxNjY0ODk0MjE2LCJhdWQiOiJodHRwczovL2lkZW50aXR5LXNlcnZlci0xLmhlcm9rdWFwcC5jb20vcmVzb3VyY2VzIiwic2NvcGUiOlsic2NvcGUyIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoibGV2aW9zc2FjdiIsInN1YiI6IjQ1YzY0NzlmLWFjZGQtNGRmOC1iZTY4LTZlZWY3NDlmNzc5NiIsImF1dGhfdGltZSI6MTY2NDg3NjIxNSwiaWRwIjoibG9jYWwiLCJlbWFpbCI6ImxldmljdkB0ZXN0Iiwicm9sZSI6IkFkbWluIiwic2lkIjoiRDNDNkFBNTM2NEM4NDY1MjNBRTQ3MTNFRUZGRDMwRUQiLCJqdGkiOiJBNzM4ODc2MkEwMkMzMUI2OEI3NjU4RjMzMTAyNjg5RiJ9.mg_i2pXqTaneY8DCPcPEn_Rl_mQpTWeG5yCvbd3gN6LA6GEOWglQr3f3jf_1TFXfyBbQMNvgV6il1d6i4HyansPS1sL4oTTfJsqXD0Y9oeTAQiAHAZqM-BGBZVGHnsWsBbBkEzqQj4y-AFv1Co2f-7NwiTo0BcIeCvVS9UkFfDlbEDE3TQklJhK-bIuJirPE_j4hSvnMxVBpctaP_hl73eOYJgOwdJLxPAEa0yVGNXICKDpVoioaBCBI2ygI4uNZ6O6_hmXTH2GAZ6p0M8mbAzqUJu6E952osVmvhirNH-I84_zgkhNa2YIsOQ5grsj8lpetx9HF-Q-GzLG1pbULOQ","token_type":"Bearer","scope":"scope2","expires_at":1664894217}');
        //window.sessionStorage.setItem('oidc.user:https://localhost:5001:leviossacv', '{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzM0U1MzRCRTc4QzAwQ0QyRDkxOEMwRDQ5RUQxRTg1IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXNlcnZlci0xLmhlcm9rdWFwcC5jb20iLCJuYmYiOjE2NjQ4NzYyMTYsImlhdCI6MTY2NDg3NjIxNiwiZXhwIjoxNjY0ODk0MjE2LCJhdWQiOiJodHRwczovL2lkZW50aXR5LXNlcnZlci0xLmhlcm9rdWFwcC5jb20vcmVzb3VyY2VzIiwic2NvcGUiOlsic2NvcGUyIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoibGV2aW9zc2FjdiIsInN1YiI6IjQ1YzY0NzlmLWFjZGQtNGRmOC1iZTY4LTZlZWY3NDlmNzc5NiIsImF1dGhfdGltZSI6MTY2NDg3NjIxNSwiaWRwIjoibG9jYWwiLCJlbWFpbCI6ImxldmljdkB0ZXN0Iiwicm9sZSI6IkFkbWluIiwic2lkIjoiRDNDNkFBNTM2NEM4NDY1MjNBRTQ3MTNFRUZGRDMwRUQiLCJqdGkiOiJBNzM4ODc2MkEwMkMzMUI2OEI3NjU4RjMzMTAyNjg5RiJ9.mg_i2pXqTaneY8DCPcPEn_Rl_mQpTWeG5yCvbd3gN6LA6GEOWglQr3f3jf_1TFXfyBbQMNvgV6il1d6i4HyansPS1sL4oTTfJsqXD0Y9oeTAQiAHAZqM-BGBZVGHnsWsBbBkEzqQj4y-AFv1Co2f-7NwiTo0BcIeCvVS9UkFfDlbEDE3TQklJhK-bIuJirPE_j4hSvnMxVBpctaP_hl73eOYJgOwdJLxPAEa0yVGNXICKDpVoioaBCBI2ygI4uNZ6O6_hmXTH2GAZ6p0M8mbAzqUJu6E952osVmvhirNH-I84_zgkhNa2YIsOQ5grsj8lpetx9HF-Q-GzLG1pbULOQ","token_type":"Bearer","scope":"scope2","expires_at":1664894217}');

        render(<Provider store={store}><App /></Provider>)
        expect(screen.getByText(/All CVs/i)).toBeInTheDocument();
        userEvent.click(screen.getByLabelText('menu'))
        userEvent.click(screen.getByTestId('appBarMenuUsers'))
        expect(screen.getByText(/Users/i)).toBeInTheDocument();
    })
})
