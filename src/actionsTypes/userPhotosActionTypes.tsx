import { IPhotoParams } from "../interfaces"

export enum userPhotosActions {
    ADD_USERPHOTO_REQUEST = 'ADD_USERPHOTO_REQUEST',
    ADD_USERPHOTO_RESULT = 'ADD_USERPHOTO_RESULT',
    GET_USERPHOTO_REQUEST = 'GET_USERPHOTO_REQUEST',
    GET_USERPHOTO_RESULT = 'GET_USERPHOTO_RESULT',
    DEL_USERPHOTO_REQUEST = 'DEL_USERPHOTO_REQUEST',
    DEL_USERPHOTO_RESULT = 'DEL_USERPHOTO_RESULT',
    EDIT_USERPHOTO_REQUEST = 'EDIT_USERPHOTO_REQUEST',
    EDIT_USERPHOTO_RESULT = "EDIT_USERPHOTO_RESULT",
    ADD_PHOTOPARAMS_REQUEST = "ADD_PHOTOPARAMS_REQUEST",
    ADD_PHOTOPARAMS_RESULT = "ADD_PHOTOPARAMS_RESULT",
    EDIT_PHOTOPARAMS_REQUEST = "EDIT_PHOTOPARAMS_REQUEST",
    EDIT_PHOTOPARAMS_RESULT = "EDIT_PHOTOPARAMS_RESULT",
    DELETE_USERPHOTO_REQUEST = 'DELETE_USERPHOTO_REQUEST',
    DELETE_USERPHOTO_RESULT = 'DELETE_USERPHOTO_RESULT',
}

export interface addUserPhotoRequestAction {
    type: string,
    payload: File
}

export interface addUserPhotoResultAction {
    type: string,
    payload: string
}

export interface addPhotoParamsRequestAction {
    type: string,
    payload: any
}

export interface addPhotoParamsResultAction {
    type: string,
    payload: string
}

export interface editPhotoParamsRequestAction {
    type: string,
    payload: any,
    id: string
}

export interface editPhotoParamsResultAction {
    type: string,
    payload: string
}
// export interface getUserPhotoResultAction {
//     type: string,
//     payload: IUserPhoto
// }

// export interface getUserPhotoRequestAction {
//     type: string,
//     id: string
// }

// export interface delUserPhotoRequestAction {
//     type: string,
//     payload: string
// }

// export interface delUserPhotoResultAction {
//     type: string
// }

// export interface editUserPhotoRequestAction {
//     type: string,
//     payload: IUserPhoto,
//     id: number
// }

// export interface editUserPhotoResultAction {
//     type: string,
// }