import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';

const axiosAddPhotoParams = (data: any) => {
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
    }
    console.log(data)
    return axios.post<any>(
        `http://localhost:3001/profilephoto/params/add`,
        JSON.stringify(data),
        {
            headers
        }
    );
}

export default function* addPhotoParamsFetch(data: any) {
    try {
        const addPhotoParamsResponse: AxiosResponse<any> = yield axiosAddPhotoParams(data);
        yield put({ type: userPhotosActions.ADD_PHOTOPARAMS_RESULT, response: addPhotoParamsResponse.data });
    }
    catch (e) {
        console.log(e)
    }
} 
