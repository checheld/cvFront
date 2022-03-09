import { IUniversity } from "../interfaces/index";
 
 
export enum universitiesActions {
GET_UNIVERSITIES_REQUEST = 'GET_UNIVERSITIES_REQUEST',
GET_UNIVERSITIES_RESULT = 'GET_UNIVERSITIES_RESULT',
DEL_UNIVERSITY_REQUEST = 'DEL_UNIVERSITY_REQUEST',
DEL_UNIVERSITY_RESULT = 'DEL_UNIVERSITY_RESULT'
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
    payload: string
}

export interface delUniversityResultAction {
    type: string
}
