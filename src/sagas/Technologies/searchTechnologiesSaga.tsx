import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes'

const axiosSearchTechnologies = (payload: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get(
    `http://localhost:3001/technologies/search/${payload}`,
    {
      headers
    }
  )
}

export default function* searchTechnologiesFetch(payload: string) {
  try {
    const searchTechnologiesResponse: AxiosResponse<ITechnology[]> = yield call(axiosSearchTechnologies, payload);
    yield put({ type: technologiesActions.SEARCH_TECHNOLOGIES_RESULT, response: searchTechnologiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}