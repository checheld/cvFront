import { IProject, IProjectPhoto, ITechnology } from "../interfaces/index";
 
export enum projectsActions {
    GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST',
    GET_PROJECTS_RESULT = 'GET_PROJECTS_RESULT',
    DEL_PROJECT_REQUEST = 'DEL_PROJECT_REQUEST',
    DEL_PROJECT_RESULT = 'DEL_PROJECT_RESULT',
    ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST',
    ADD_PROJECT_RESULT = 'ADD_PROJECT_RESULT',
    EDIT_PROJECT_REQUEST = 'EDIT_PROJECT_REQUEST',
    EDIT_PROJECT_RESULT = "EDIT_PROJECT_RESULT",
    SEARCH_PROJECTS_REQUEST = 'SEARCH_PROJECTS_REQUEST',
    SEARCH_PROJECTS_RESULT = "SEARCH_PROJECTS_RESULT",
    GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST',
    GET_PROJECT_RESULT = 'GET_PROJECT_RESULT',
}

export interface getProjectsResultAction {
    type: string,
    payload: IProject[]
}

export interface getProjectsRequestAction {
    type: string
}
export interface getProjectResultAction {
    type: string,
    payload: IProject
}
export interface getProjectRequestAction {
    type: string,
    id: string
}
export interface delProjectRequestAction {
    type: string,
    payload: string
}

export interface delProjectResultAction {
    type: string
}

export interface addProjectRequestAction {
    type: string,
    payload: Array<IProject>
}

export interface addProjectResultAction {
    type: string
}

export interface editProjectRequestAction {
    type: string,
    payload: {name: string, description: string, type: string, country: string, link: string, technologyList: ITechnology[], photoList: IProjectPhoto[]},
    id: number
}

export interface editProjectResultAction {
    type: string,
}

export interface searchProjectsRequestAction {
    type: string,
    payload: {name: string, type: string, technologyName: string}
}

export interface searchProjectsResultAction {
    type: string,
    payload: IProject[]
}
