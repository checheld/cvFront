import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditUniversity = (payload: string, id: number, config: any) =>
  instance.put(
    `/universities/${id}`,
    { Name: payload }
  )


export default function* updateUniversityFetch(payload: string, id: number) {
  try {
    const updateUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosEditUniversity, payload, id, config);
    yield put({ type: universitiesActions.EDIT_UNIVERSITY_RESULT, response: updateUniversityResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

