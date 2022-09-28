import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import instance from '../../axiosSetting';
import config from '../../headers';

const axiosAddPhotoParams = (data: any, config: any) =>

    instance.post<any>(
        `/profilephoto/params/add`,
        data,
        config
    );

export default function* addPhotoParamsFetch(data: any) {
    try {
        const addPhotoParamsResponse: AxiosResponse<any> = yield axiosAddPhotoParams(data, config);
        yield put({ type: userPhotosActions.ADD_PHOTOPARAMS_RESULT, response: addPhotoParamsResponse.data });
    }
    catch (e) {
        console.log(e)
    }
} 
