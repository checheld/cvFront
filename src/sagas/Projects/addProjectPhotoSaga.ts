import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { projectPhotosActions } from '../../actionsTypes/projectPhotosActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddProjectPhoto = (payload: File, config: any) => {
  const data = new FormData();
  data.append('file', payload);
  data.append('upload_preset', `${process.env.REACT_APP_PRESET_NAME}`);
  return instance.post<File>(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    data
  );
}

export default function* addProjectPhotoFetch(payload: File) {
  try {
    const addProjectPhotoResponse: AxiosResponse<string> = yield axiosAddProjectPhoto(payload, config);
    yield put({ type: projectPhotosActions.ADD_PROJECTPHOTO_RESULT, response: addProjectPhotoResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
