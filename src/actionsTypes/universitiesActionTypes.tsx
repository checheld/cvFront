import { IUniversity } from "../interfaces/index";
 
export enum universitiesActions {
    GET_UNIVERSITIES_REQUEST = 'GET_UNIVERSITIES_REQUEST',
    GET_UNIVERSITIES_RESULT = 'GET_UNIVERSITIES_RESULT',
    DEL_UNIVERSITY_REQUEST = 'DEL_UNIVERSITY_REQUEST',
    DEL_UNIVERSITY_RESULT = 'DEL_UNIVERSITY_RESULT',
    ADD_UNIVERSITY_REQUEST = 'ADD_UNIVERSITY_REQUEST',
    ADD_UNIVERSITY_RESULT = 'ADD_UNIVERSITY_RESULT',
    EDIT_UNIVERSITY_REQUEST = 'EDIT_UNIVERSITY_REQUEST',
    EDIT_UNIVERSITY_RESULT = "EDIT_UNIVERSITY_RESULT",
    SEARCH_UNIVERSITIES_REQUEST = 'SEARCH_UNIVERSITIES_REQUEST',
    SEARCH_UNIVERSITIES_RESULT = "SEARCH_UNIVERSITIES_RESULT"
}

export interface getUniversitiesResultAction {
    type: string,
    payload: IUniversity[]
}

export interface getUniversitiesRequestAction {
    type: string
}

export interface delUniversityRequestAction {
    type: string,
    id: number
}

export interface delUniversityResultAction {
    type: string
}

export interface addUniversityRequestAction {
    type: string,
    payload: Array<IUniversity>
}

export interface addUniversityResultAction {
    type: string
}

export interface editUniversityRequestAction {
    type: string,
    payload: string,
    id: number
}

export interface editUniversityResultAction {
    type: string,
}

export interface searchUniversitiesRequestAction {
    type: string,
    payload: string
}

export interface searchUniversitiesResultAction {
    type: string,
    payload: IUniversity[]
}
