import { put, call, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';

const axiosAddUniversity = (data: Array<IUniversity>) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<any>(
    `http://localhost:3001/universities/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addUniversityFetch(data: Array<IUniversity>) {
  try {
        const addUniversitiesResponse: AxiosResponse<any> = yield axiosAddUniversity(data);
        yield put({type: universitiesActions.ADD_UNIVERSITY_RESULT, response: addUniversitiesResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
