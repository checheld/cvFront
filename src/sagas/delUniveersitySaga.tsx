import { put, call, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../interfaces/index'
import { delUniversityRequest } from '../actionCreators/universityActionCreator';
import { universitiesActions } from '../actionsTypes/universitiesActionTypes';

const axiosDelUniversity = (id: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.delete<string>(
    `http://localhost:3001/universities/${id}`, 
      {
          headers
      }
);}

export default function* deltUniversityFetch(id: string) {
  try{
    const delUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosDelUniversity, id);
    yield put({type: universitiesActions.DEL_UNIVERSITY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 
