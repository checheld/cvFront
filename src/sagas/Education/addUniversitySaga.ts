import { put, call, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import instance from '../axiosSetting';

const axiosAddUniversity = (data: Array<IUniversity>) => {

  return instance.post<Array<IUniversity>>(
    `/universities/add`,
    data
  );
}

export default function* addUniversityFetch(data: Array<IUniversity>) {
  try {
    const addUniversitiesResponse: AxiosResponse<Array<IUniversity>> = yield axiosAddUniversity(data);
    yield put({ type: universitiesActions.ADD_UNIVERSITY_RESULT, response: addUniversitiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
