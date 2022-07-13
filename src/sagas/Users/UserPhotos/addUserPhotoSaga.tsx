import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import instance from '../../axiosSetting';

const axiosAddUserPhoto = (payload: File) => {
  const data = new FormData();
  data.append('image', payload);
  return instance.post<File>(
    `/profilephoto/add`,
    data
  );
}

export default function* addUserPhotoFetch(payload: File) {
  try {
    const addUserPhotoResponse: AxiosResponse<string> = yield axiosAddUserPhoto(payload);
    yield put({ type: userPhotosActions.ADD_USERPHOTO_RESULT, response: addUserPhotoResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
