import {
    getProjectTypesResultAction,
    getProjectTypesRequestAction,
    delProjectTypeRequestAction,
    delProjectTypeResultAction,
    projectTypesActions,
    addProjectTypeRequestAction,
    editProjectTypeRequestAction,
    editProjectTypeResultAction,
    addProjectTypeResultAction,
    searchProjectTypesRequestAction,
    searchProjectTypesResultAction
} from '../actionsTypes/projectTypesActionTypes';
import { IProjectType } from "../interfaces/index";


export const getProjectTypesRequest = (): getProjectTypesRequestAction => {
    return {
        type: projectTypesActions.GET_PROJECTTYPES_REQUEST
    }
}
export const getProjectTypesResult = (projectTypes: IProjectType[]): getProjectTypesResultAction => {
    return {
        type: projectTypesActions.GET_PROJECTTYPES_RESULT,
        payload: projectTypes
    }
}

export const delProjectTypeRequest = (id: number): delProjectTypeRequestAction => {
    return {
        type: projectTypesActions.DEL_PROJECTTYPE_REQUEST,
        id: id
    }
}

export const delProjectTypeResult = (): delProjectTypeResultAction => {
    return {
        type: projectTypesActions.DEL_PROJECTTYPE_RESULT
    }
}

export const addProjectTypeRequest = (payload: Array<IProjectType>): addProjectTypeRequestAction => {
    return {
        type: projectTypesActions.ADD_PROJECTTYPE_REQUEST,
        payload: payload
    }
}

export const addProjectTypeResult = (): addProjectTypeResultAction => {
    return {
        type: projectTypesActions.ADD_PROJECTTYPE_RESULT
    }
}

export const editProjectTypeRequest = (payload: string, id: number): editProjectTypeRequestAction => {
    return {
        type: projectTypesActions.EDIT_PROJECTTYPE_REQUEST,
        payload: payload,
        id: id
    }
}

export const editProjectTypeResult = (): editProjectTypeResultAction => {
    return {
        type: projectTypesActions.EDIT_PROJECTTYPE_RESULT,
    }
}

export const searchProjectTypesRequest = (payload: string): searchProjectTypesRequestAction => {
    return {
        type: projectTypesActions.SEARCH_PROJECTTYPES_REQUEST,
        payload: payload
    }
}

export const searchProjectTypesResult = (searchProjectTypes: IProjectType[]): searchProjectTypesResultAction => {
    return {
        type: projectTypesActions.SEARCH_PROJECTTYPES_RESULT,
        payload: searchProjectTypes
    }
}