import { 
    projectPhotosActions,
    addProjectPhotoRequestAction,
    addProjectPhotoResultAction,
    delProjectPhotoRequestAction,
    delProjectPhotoResultAction,
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

export const delProjectPhotoRequest = (id: number): delProjectPhotoRequestAction => {
    return{
        type: projectPhotosActions.DEL_PROJECTPHOTO_REQUEST,
        id: id
    }
}

export const delProjectPhotoResult = (): delProjectPhotoResultAction => {
    return{
        type: projectPhotosActions.DEL_PROJECTPHOTO_RESULT
    }
}