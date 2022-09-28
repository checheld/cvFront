import { put, call, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../../interfaces/index'
import { universitiesActions } from '../../actionsTypes/universitiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddUniversity = (data: Array<IUniversity>, config: any) => {

  return instance.post<Array<IUniversity>>(
    `/universities/add`,
    data,
    config
  );
}

export default function* addUniversityFetch(data: Array<IUniversity>) {
  try {
    const addUniversitiesResponse: AxiosResponse<Array<IUniversity>> = yield axiosAddUniversity(data, config);
    yield put({ type: universitiesActions.ADD_UNIVERSITY_RESULT, response: addUniversitiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
