import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { userPhotosActions } from '../../../actionsTypes/userPhotosActionTypes';
import { IPhotoParams } from '../../../interfaces';

const axiosAddUserPhoto = (payload: File) => {
  const data = new FormData();
  data.append('image', payload);
  return axios.post<File>(
    `http://localhost:3001/profilephoto/add`,
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
