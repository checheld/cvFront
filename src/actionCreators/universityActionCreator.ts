import { 
    getUniversitiesResultAction,
    getUniversitiesRequestAction,
    delUniversityRequestAction,
    delUniversityResultAction,
    universitiesActions,
    addUniversityRequestAction,
    editUniversityRequestAction,
    editUniversityResultAction,
    addUniversityResultAction,
    searchUniversitiesRequestAction,
    searchUniversitiesResultAction
} from '../actionsTypes/universitiesActionTypes';
import { IUniversity } from "../interfaces/index";


export const getUniversitiesRequest = () : getUniversitiesRequestAction => {
    return{
        type: universitiesActions.GET_UNIVERSITIES_REQUEST
    }
}
export const getUniversitiesResult = (universities:IUniversity[]) : getUniversitiesResultAction => {
    return{
        type: universitiesActions.GET_UNIVERSITIES_RESULT,
        payload: universities
    }
}

export const delUniversityRequest = (payload: string): delUniversityRequestAction => {
    return{
        type: universitiesActions.DEL_UNIVERSITY_REQUEST,
        payload: payload
    }
}

export const delUniversityResult = (): delUniversityResultAction => {
    return{
        type: universitiesActions.DEL_UNIVERSITY_RESULT
    }
}

export const addUniversityRequest = (payload: Array<IUniversity>): addUniversityRequestAction => {
    return{
        type: universitiesActions.ADD_UNIVERSITY_REQUEST,
        payload: payload
    }
}

export const addUniversityResult = (): addUniversityResultAction => {
    return{
        type: universitiesActions.ADD_UNIVERSITY_RESULT
    }
}

export const editUniversityRequest = (payload: string, id: number): editUniversityRequestAction => {
    return{
        type: universitiesActions.EDIT_UNIVERSITY_REQUEST,
        payload: payload,
        id: id
    }
}

export const editUniversityResult = (): editUniversityResultAction => {
    return{
        type: universitiesActions.EDIT_UNIVERSITY_RESULT,
    }
}

export const searchUniversitiesRequest = (payload: string): searchUniversitiesRequestAction => {
    return{
        type: universitiesActions.SEARCH_UNIVERSITIES_REQUEST,
        payload: payload
    }
}

export const searchUniversitiesResult = (searchUniversities:IUniversity[]) : searchUniversitiesResultAction => {
    return{
        type: universitiesActions.SEARCH_UNIVERSITIES_RESULT,
        payload: searchUniversities
    }
}