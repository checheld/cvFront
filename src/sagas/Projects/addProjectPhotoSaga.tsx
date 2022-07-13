import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { projectPhotosActions } from '../../actionsTypes/projectPhotosActionTypes';
import instance from '../axiosSetting';

const axiosAddProjectPhoto = (payload: File) => {

  const data = new FormData();
  data.append('image', payload);
  instance.post<File>(
    `/projectphoto/add`,
    data
  );
}

export default function* addProjectPhotoFetch(payload: File) {
  try {
    const addProjectPhotoResponse: AxiosResponse<string> = yield axiosAddProjectPhoto(payload);
    yield put({ type: projectPhotosActions.ADD_PROJECTPHOTO_RESULT, response: addProjectPhotoResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
