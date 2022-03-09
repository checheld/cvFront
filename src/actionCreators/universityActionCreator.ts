import { 
    getUniversitiesResultAction,
    getUniversitiesRequestAction,
    delUniversityRequestAction,
    delUniversityResultAction,
    universitiesActions
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