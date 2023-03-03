
export enum projectPhotosActions {
    ADD_PROJECTPHOTO_REQUEST = 'ADD_PROJECTPHOTO_REQUEST',
    ADD_PROJECTPHOTO_RESULT = 'ADD_PROJECTPHOTO_RESULT',
}


export interface addProjectPhotoRequestAction {
    type: string,
    payload: File
}

export interface addProjectPhotoResultAction {
    type: string,
    payload: string
}