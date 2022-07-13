import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import instance from '../../axiosSetting';

const axiosAddPhotoParams = (data: any) =>

    instance.post<any>(
        `/profilephoto/params/add`,
        data
    );


export default function* addPhotoParamsFetch(data: any) {
    try {
        const addPhotoParamsResponse: AxiosResponse<any> = yield axiosAddPhotoParams(data);
        yield put({ type: userPhotosActions.ADD_PHOTOPARAMS_RESULT, response: addPhotoParamsResponse.data });
    }
    catch (e) {
        console.log(e)
    }
} 
