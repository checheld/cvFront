import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes'

const axiosSearchUniversities = (payload: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get(
    `http://localhost:3001/universities/search/${payload}`,
    {
      headers
    }
  )
}

export default function* searchUniversitiesFetch(payload: string) {
  try {
    const searchUniversitiesResponse: AxiosResponse<IUniversity[]> = yield call(axiosSearchUniversities, payload);
    yield put({ type: universitiesActions.SEARCH_UNIVERSITIES_RESULT, response: searchUniversitiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}