import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelUniversity = (id: string, config: any) =>
  instance.delete(
    `/universities/${id}`,
    config
  )

export default function* deltUniversityFetch(id: string) {
  try {
    const delUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosDelUniversity, id, config);
    yield put({ type: universitiesActions.DEL_UNIVERSITY_RESULT, response: delUniversityResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

