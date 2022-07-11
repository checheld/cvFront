import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';

const axiosEditPhotoParams = (payload: any, id: string) => {
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
    }
    return axios.put(
        `http://localhost:3001/profilephoto/params/${id}`,
        JSON.stringify(payload),
        {
            headers
        }
    )
}

export default function* editPhotoParamsFetch(payload: any, id: string) {
    try {
        const updatPhotoParamsResponse: AxiosResponse<any> = yield call(axiosEditPhotoParams, payload, id);
        yield put({ type: userPhotosActions.EDIT_PHOTOPARAMS_RESULT, response: updatPhotoParamsResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}