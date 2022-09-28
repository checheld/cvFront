import { ILogin } from "../interfaces/index";

export enum loginActions {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_RESULT = 'LOGIN_RESULT',
}

export interface loginResultAction {
    type: string,
    payload: ILogin
}

export interface loginRequestAction {
    type: string,
    payload: any
}