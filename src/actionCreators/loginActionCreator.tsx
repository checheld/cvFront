import {
    loginResultAction,
    loginRequestAction,
    loginActions
} from '../actionsTypes/loginActionTypes';
import { ILogin } from '../interfaces';

export const loginRequest = (payload: ILogin): loginRequestAction => {
    return {
        type: loginActions.LOGIN_REQUEST,
        payload: payload
    }
}
export const loginResult = (payload: any): loginResultAction => {
    return {
        type: loginActions.LOGIN_RESULT,
        payload: payload
    }
}