import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import instance from '../../axiosSetting';

const axiosEditPhotoParams = (payload: any, id: string) =>

    instance.put(
        `/profilephoto/params/${id}`,
        payload
    )

export default function* editPhotoParamsFetch(payload: any, id: string) {
    try {
        const updatPhotoParamsResponse: AxiosResponse<any> = yield call(axiosEditPhotoParams, payload, id);
        yield put({ type: userPhotosActions.EDIT_PHOTOPARAMS_RESULT, response: updatPhotoParamsResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}