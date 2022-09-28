import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes'
import instance from '../axiosSetting'
import config from '../headers';

const axiosSearchUniversities = (payload: string, config: any) =>
  instance.get(
    `/universities/search/${payload}`,
    config
  )

export default function* searchUniversitiesFetch(payload: string) {
  try {
    const searchUniversitiesResponse: AxiosResponse<IUniversity[]> = yield call(axiosSearchUniversities, payload, config);
    yield put({ type: universitiesActions.SEARCH_UNIVERSITIES_RESULT, response: searchUniversitiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}