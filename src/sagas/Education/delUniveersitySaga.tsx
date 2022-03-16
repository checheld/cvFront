import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';

const axiosDelUniversity = (id: string) => {
  return axios.delete(
    `http://localhost:3001/universities/${id}`
  )
}

export default function* deltUniversityFetch(id: string) {
  try{
    const delUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosDelUniversity, id);
    yield put({type: universitiesActions.DEL_UNIVERSITY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

