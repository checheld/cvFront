import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';

const axiosEditTechnology = (payload: string, id: number) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  console.log(payload)
  return axios.put(
    `http://localhost:3001/technologies/${id}`,
    JSON.stringify({Name: payload}),
    {
        headers
    }
  )
}

export default function* updateTechnologyFetch(payload: string, id: number) {
  try{
    const updatTechnologyResponse: AxiosResponse<ITechnology> = yield call(axiosEditTechnology, payload, id);
    yield put({type: technologiesActions.EDIT_TECHNOLOGY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

