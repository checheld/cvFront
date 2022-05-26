import { 
    userPhotosActions,
    addUserPhotoRequestAction,
    addUserPhotoResultAction,
} from '../actionsTypes/userPhotosActionTypes';

export const addUserPhotoRequest = (payload: File): addUserPhotoRequestAction => {
    return{
        type: userPhotosActions.ADD_USERPHOTO_REQUEST,
        payload: payload
    }
}

export const addUserPhotoResult = (payload: string): addUserPhotoResultAction => {
    return{
        type: userPhotosActions.ADD_USERPHOTO_RESULT,
        payload: payload
    }
}