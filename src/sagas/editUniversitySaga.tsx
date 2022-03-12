import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { IUniversity } from '../interfaces/index'
import { universitiesActions } from '../actionsTypes/universitiesActionTypes';

const axiosEditUniversity = (payload: IUniversity) => {
  return axios.put(
    `http://localhost:3001/universities/${payload.id}`
  )
}

export default function* updateUniversityFetch(payload: IUniversity) {
  try{
    const updateUniversityResponse: AxiosResponse<IUniversity> = yield call(axiosEditUniversity, payload);
    yield put({type: universitiesActions.EDIT_UNIVERSITY_RESULT, response: Response});
  }
  catch(e) {
    console.log(e)
  }
} 

