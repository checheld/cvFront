import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { projectPhotosActions } from '../../actionsTypes/projectPhotosActionTypes';

const axiosAddProjectPhoto = (payload: File) => {

  const data = new FormData();
  data.append('image', payload);
  return axios.post<File>(
    `http://localhost:3001/projectphoto/add`,
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
