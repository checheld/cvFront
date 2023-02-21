import {
    getProjectsResultAction,
    getProjectsRequestAction,
    projectsActions,
    delProjectRequestAction,
    delProjectResultAction,
    addProjectRequestAction,
    addProjectResultAction,
    editProjectRequestAction,
    searchProjectsRequestAction,
    searchProjectsResultAction,
    editProjectResultAction,
    getProjectRequestAction,
    getProjectResultAction
} from '../actionsTypes/projectsActionTypes';
import { IProject, IProjectPhoto, ITechnology } from "../interfaces/index";


export const getProjectsRequest = (): getProjectsRequestAction => {
    return {
        type: projectsActions.GET_PROJECTS_REQUEST
    }
}
export const getProjectsResult = (projects: IProject[]): getProjectsResultAction => {
    return {
        type: projectsActions.GET_PROJECTS_RESULT,
        payload: projects
    }
}
export const getProjectRequest = (id: number): getProjectRequestAction => {
    return {
        type: projectsActions.GET_PROJECT_REQUEST,
        id: id
    }
}
export const getProjectResult = (project: IProject): getProjectResultAction => {
    return {
        type: projectsActions.GET_PROJECT_RESULT,
        payload: project
    }
}
export const delProjectRequest = (id: number): delProjectRequestAction => {
    return {
        type: projectsActions.DEL_PROJECT_REQUEST,
        id: id
    }
}

export const delProjectResult = (): delProjectResultAction => {
    return {
        type: projectsActions.DEL_PROJECT_RESULT
    }
}

export const addProjectRequest = (payload: IProject): addProjectRequestAction => {
    return {
        type: projectsActions.ADD_PROJECT_REQUEST,
        payload: payload
    }
}

export const addProjectResult = (): addProjectResultAction => {
    return {
        type: projectsActions.ADD_PROJECT_RESULT
    }
}

export const editProjectRequest = (project: { id: number, name: string, description: string, type: string, country: string, link: string, technologies: ITechnology[], photoList: IProjectPhoto[] }, id: number): editProjectRequestAction => {
    return {
        type: projectsActions.EDIT_PROJECT_REQUEST,
        project: project,
        id: id
    }
}

export const editProjectResult = (): editProjectResultAction => {
    return {
        type: projectsActions.EDIT_PROJECT_RESULT,
    }
}

export const searchProjectsRequest = (payload: { name: string, type: string, technologyName: string }): searchProjectsRequestAction => {
    return {
        type: projectsActions.SEARCH_PROJECTS_REQUEST,
        payload: payload
    }
}

export const searchProjectsResult = (searchProjects: IProject[]): searchProjectsResultAction => {
    return {
        type: projectsActions.SEARCH_PROJECTS_RESULT,
        payload: searchProjects
    }
}