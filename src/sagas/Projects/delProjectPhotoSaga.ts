import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IProjectPhoto } from '../../interfaces/index'
import { projectPhotosActions } from '../../actionsTypes/projectPhotosActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelProjectPhoto = (id: number, config: any) =>
  instance.delete(
    `/projectphoto/${id}`,
    config
  )

export default function* deltProjectPhotoFetch(id: number) {
  try {
    console.log(id)
    const delProjectPhotoResponse: AxiosResponse<IProjectPhoto> = yield call(axiosDelProjectPhoto, id, config);
    yield put({ type: projectPhotosActions.DEL_PROJECTPHOTO_RESULT });
  }
  catch (e) {
    console.log(e)
  }
}

