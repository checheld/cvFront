import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';

const axiosEditUniversity = (payload: string, id: number) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  console.log(payload)
  return axios.put(
    `http://localhost:3001/universities/${id}`,
    JSON.stringify({Name: payload}),
    {
        headers
    }
  )
}

export default function* updateUniversityFetch(payload: string, id: number) {
  try{
    const updateUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosEditUniversity, payload, id);
    yield put({type: universitiesActions.EDIT_UNIVERSITY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

