import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import instance from '../axiosSetting';

const axiosDelUniversity = (id: string) =>
  instance.delete(
    `/universities/${id}`
  )


export default function* deltUniversityFetch(id: string) {
  try {
    const delUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosDelUniversity, id);
    yield put({ type: universitiesActions.DEL_UNIVERSITY_RESULT, response: delUniversityResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

