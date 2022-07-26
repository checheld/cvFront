import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProjectPhoto } from '../../interfaces/index'
import { projectPhotosActions } from '../../actionsTypes/projectPhotosActionTypes';
import instance from '../axiosSetting';

const axiosDelProjectPhoto = (id: string) =>
  instance.delete(
    `/projectphoto/${id}`
  )

export default function* deltProjectPhotoFetch(id: string) {
  try {
    console.log(id)
    const delProjectPhotoResponse: AxiosResponse<IProjectPhoto> = yield call(axiosDelProjectPhoto, id);
    yield put({ type: projectPhotosActions.DEL_PROJECTPHOTO_RESULT });
  }
  catch (e) {
    console.log(e)
  }
}

