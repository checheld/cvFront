import { IProjectType } from "../interfaces/index";

export enum projectTypesActions {
    GET_PROJECTTYPES_REQUEST = 'GET_PROJECTTYPES_REQUEST',
    GET_PROJECTTYPES_RESULT = 'GET_PROJECTTYPES_RESULT',
    DEL_PROJECTTYPE_REQUEST = 'DEL_PROJECTTYPE_REQUEST',
    DEL_PROJECTTYPE_RESULT = 'DEL_PROJECTTYPE_RESULT',
    ADD_PROJECTTYPE_REQUEST = 'ADD_PROJECTTYPE_REQUEST',
    ADD_PROJECTTYPE_RESULT = 'ADD_PROJECTTYPE_RESULT',
    EDIT_PROJECTTYPE_REQUEST = 'EDIT_PROJECTTYPE_REQUEST',
    EDIT_PROJECTTYPE_RESULT = "EDIT_PROJECTTYPE_RESULT",
    SEARCH_PROJECTTYPES_REQUEST = 'SEARCH_PROJECTTYPES_REQUEST',
    SEARCH_PROJECTTYPES_RESULT = "SEARCH_PROJECTTYPES_RESULT"
}

export interface getProjectTypesResultAction {
    type: string,
    payload: IProjectType[]
}

export interface getProjectTypesRequestAction {
    type: string
}

export interface delProjectTypeRequestAction {
    type: string,
    id: number
}

export interface delProjectTypeResultAction {
    type: string
}

export interface addProjectTypeRequestAction {
    type: string,
    payload: Array<IProjectType>
}

export interface addProjectTypeResultAction {
    type: string
}

export interface editProjectTypeRequestAction {
    type: string,
    payload: string,
    id: number
}

export interface editProjectTypeResultAction {
    type: string,
}

export interface searchProjectTypesRequestAction {
    type: string,
    payload: string
}

export interface searchProjectTypesResultAction {
    type: string,
    payload: IProjectType[]
}
