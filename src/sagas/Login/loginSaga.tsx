import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ILogin } from '../../interfaces/index'
import { loginActions } from '../../actionsTypes/loginActionTypes';
import instance from '../axiosSetting';

const axiosLogin = (data: ILogin) =>

    instance.post<ILogin>(
        'https://levilabs-api.herokuapp.com/auth/sign_in',
        data
    );


export default function* addLoginFetch(data: ILogin) {
    try {
        const loginResponse: AxiosResponse<ILogin> = yield axiosLogin(data);
        yield put({ type: loginActions.LOGIN_RESULT, response: loginResponse.headers });
    }
    catch (e) {
        console.log(e)
    }
} 
