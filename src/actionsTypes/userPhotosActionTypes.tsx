 export enum userPhotosActions {
    ADD_USERPHOTO_REQUEST = 'ADD_USERPHOTO_REQUEST',
    ADD_USERPHOTO_RESULT = 'ADD_USERPHOTO_RESULT',
}


export interface addUserPhotoRequestAction {
    type: string,
    payload: File
}

export interface addUserPhotoResultAction {
    type: string,
    payload: string
}