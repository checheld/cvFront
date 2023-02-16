import { 
    getCVsResultAction,
    getCVsRequestAction,
    getCVResultAction,
    getCVRequestAction,
    delCVRequestAction,
    delCVResultAction,
    downloadCVRequestAction,
    downloadCVResultAction,
    CVsActions,
    addCVRequestAction,
    editCVRequestAction,
    editCVResultAction,
    addCVResultAction,
    searchCVsRequestAction,
    searchCVsResultAction
} from '../actionsTypes/CVsActionTypes';
import { IProjectCV, ICV } from "../interfaces/index";


export const getCVsRequest = () : getCVsRequestAction => {
    return{
        type: CVsActions.GET_CVS_REQUEST
    }
}
export const getCVsResult = (CVs:ICV[]) : getCVsResultAction => {
    return{
        type: CVsActions.GET_CVS_RESULT,
        payload: CVs
    }
}
export const getCVRequest = (id: string) : getCVRequestAction => {
    return{
        type:  CVsActions.GET_CV_REQUEST,
        id: id
    }
}
export const getCVResult = (CV:ICV) : getCVResultAction => {
    return{
        type: CVsActions.GET_CV_RESULT,
        payload: CV
    }
}
export const delCVRequest = (payload: string): delCVRequestAction => {
    return{
        type: CVsActions.DEL_CV_REQUEST,
        payload: payload
    }
}

export const delCVResult = (): delCVResultAction => {
    return{
        type: CVsActions.DEL_CV_RESULT
    }
}

export const downloadCVRequest = (payload: number): downloadCVRequestAction => {
    return{
        type: CVsActions.DOWNLOAD_CV_REQUEST,
        payload: payload
    }
}

export const downloadCVResult = (): downloadCVResultAction => {
    return{
        type: CVsActions.DOWNLOAD_CV_RESULT
    }
}

export const addCVRequest = (payload: ICV): addCVRequestAction => {
    return{
        type: CVsActions.ADD_CV_REQUEST,
        payload: payload
    }
}

export const addCVResult = (): addCVResultAction => {
    return{
        type: CVsActions.ADD_CV_RESULT
    }
}

export const editCVRequest = (payload: { id: string, CVName: string, userId: string, projectCVList: IProjectCV[]}, id: number): editCVRequestAction => {
    return{
        type: CVsActions.EDIT_CV_REQUEST,
        payload: payload,
        id: id
    }
}

export const editCVResult = (): editCVResultAction => {
    return{
        type: CVsActions.EDIT_CV_RESULT,
    }
}

export const searchCVsRequest = (payload: string): searchCVsRequestAction => {
    return{
        type: CVsActions.SEARCH_CVS_REQUEST,
        payload: payload
    }
}

export const searchCVsResult = (searchCVs:ICV[]) : searchCVsResultAction => {
    return{
        type: CVsActions.SEARCH_CVS_RESULT,
        payload: searchCVs
    }
}