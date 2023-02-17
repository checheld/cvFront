import {
    userPhotosActions,
    addUserPhotoRequestAction,
    addUserPhotoResultAction,
    addPhotoParamsRequestAction,
    addPhotoParamsResultAction,
    editPhotoParamsRequestAction,
    editPhotoParamsResultAction,
} from '../actionsTypes/userPhotosActionTypes';
import { IPhotoParams } from '../interfaces';

export const addUserPhotoRequest = (payload: File): addUserPhotoRequestAction => {
    return {
        type: userPhotosActions.ADD_USERPHOTO_REQUEST,
        payload: payload
    }
}

export const addUserPhotoResult = (payload: string): addUserPhotoResultAction => {
    return {
        type: userPhotosActions.ADD_USERPHOTO_RESULT,
        payload: payload
    }
}

export const addPhotoParamsRequest = (payload: any): addPhotoParamsRequestAction => {
    return {
        type: userPhotosActions.ADD_PHOTOPARAMS_REQUEST,
        payload: payload
    }
}

export const addPhotoParamsResult = (payload: string): addPhotoParamsResultAction => {
    return {
        type: userPhotosActions.EDIT_PHOTOPARAMS_REQUEST,
        payload: payload
    }
}

export const editPhotoParamsRequest = (payload: any, id: number): editPhotoParamsRequestAction => {
    return {
        type: userPhotosActions.EDIT_PHOTOPARAMS_REQUEST,
        payload: payload,
        id: id
    }
}

export const editPhotoParamsResult = (payload: string): editPhotoParamsResultAction => {
    return {
        type: userPhotosActions.EDIT_PHOTOPARAMS_RESULT,
        payload: payload
    }
}
// export const getUserPhotoRequest = (id: string) : getUserPhotoRequestAction => {
//     return{
//         type:  userPhotosActions.GET_USERPHOTO_REQUEST,
//         id: id
//     }
// }
// export const getUserPhotoResult = (userPhoto: IUserPhoto) : getUserPhotoResultAction => {
//     return{
//         type: userPhotosActions.GET_USERPHOTO_RESULT,
//         payload: userPhoto
//     }
// }

// export const delUserPhotoRequest = (payload: string): delUserPhotoRequestAction => {
//     return{
//         type: userPhotosActions.DEL_USERPHOTO_REQUEST,
//         payload: payload
//     }
// }

// export const delUserPhotoResult = (): delUserPhotoResultAction => {
//     return{
//         type: userPhotosActions.DEL_USERPHOTO_RESULT
//     }
// }

// export const editUserPhotoRequest = (payload: IUserPhoto, id: number): editUserPhotoRequestAction => {
//     return{
//         type: userPhotosActions.EDIT_USERPHOTO_REQUEST,
//         payload: payload,
//         id: id
//     }
// }

// export const editUserPhotoResult = (): editUserPhotoResultAction => {
//     return{
//         type: userPhotosActions.EDIT_USERPHOTO_RESULT,
//     }
// }