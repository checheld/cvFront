import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes'

const axiosSearchCVs = (payload: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get(
    `http://localhost:3001/CVs/search/${payload}`,
    {
      headers
    }
  )
}

export default function* searchCVsFetch(payload: string) {
  try {
    const searchCVsResponse: AxiosResponse<ICV[]> = yield call(axiosSearchCVs, payload);
    yield put({ type: CVsActions.SEARCH_CVS_RESULT, response: searchCVsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}