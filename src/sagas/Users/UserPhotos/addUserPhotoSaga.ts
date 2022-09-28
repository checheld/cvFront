import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import instance from '../../axiosSetting';
import config from '../../headers';

const axiosAddUserPhoto = (payload: File, config: any) => {
  const data = new FormData();
  data.append('image', payload);
  return instance.post<File>(
    `/profilephoto/add`,
    data,
    config
  );
}

export default function* addUserPhotoFetch(payload: File) {
  try {
    const addUserPhotoResponse: AxiosResponse<string> = yield axiosAddUserPhoto(payload, config);
    yield put({ type: userPhotosActions.ADD_USERPHOTO_RESULT, response: addUserPhotoResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
