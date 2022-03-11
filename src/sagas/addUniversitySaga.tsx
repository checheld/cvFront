import { put, call, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../interfaces/index'
import { universitiesActions } from '../actionsTypes/universitiesActionTypes';

const axiosAddUniversity = (data: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<any>(
    `http://localhost:3001/universities/add`, 
    JSON.stringify({Name: data}),
      {
          headers
      }
);}

export default function* addUniversityFetch(data: string) {
  try{
        const getUniversitiesResponse: AxiosResponse<any> = yield axiosAddUniversity(data);
        yield put({type: universitiesActions.ADD_UNIVERSITY_RESULT, response: getUniversitiesResponse.data.id});
    // yield takeLatest(universitiesActions.GET_UNIVERSITIES_RESULT, axiosAddUniversity);
  }
  catch(e) {
    console.log(e)
  }
} 
