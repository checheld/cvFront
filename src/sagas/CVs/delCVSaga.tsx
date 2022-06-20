import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';

const axiosDelCV = (payload: string) => { 
  return axios.delete(
    `http://localhost:3001/CVs/${payload}`
  )
}

export default function* delCVFetch(payload: string) {
  try{
    const delCVResponse: AxiosResponse<ICV> = yield call(axiosDelCV, payload);
    yield put({type: CVsActions.DEL_CV_RESULT});
  }
  catch(e) {
    console.log(e)
  }
} 

