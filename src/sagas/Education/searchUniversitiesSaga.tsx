import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes'
import instance from '../axiosSetting'

const axiosSearchUniversities = (payload: string) =>
  instance.get(
    `/universities/search/${payload}`
  )

export default function* searchUniversitiesFetch(payload: string) {
  try {
    const searchUniversitiesResponse: AxiosResponse<IUniversity[]> = yield call(axiosSearchUniversities, payload);
    yield put({ type: universitiesActions.SEARCH_UNIVERSITIES_RESULT, response: searchUniversitiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}