import { 
    projectPhotosActions,
    addProjectPhotoRequestAction,
    addProjectPhotoResultAction,
} from '../actionsTypes/projectPhotosActionTypes';

export const addProjectPhotoRequest = (payload: File): addProjectPhotoRequestAction => {
    return{
        type: projectPhotosActions.ADD_PROJECTPHOTO_REQUEST,
        payload: payload
    }
}

export const addProjectPhotoResult = (payload: string): addProjectPhotoResultAction => {
    return{
        type: projectPhotosActions.ADD_PROJECTPHOTO_RESULT,
        payload: payload
    }
}