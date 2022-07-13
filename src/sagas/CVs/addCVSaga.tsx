import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';

const axiosAddCV = (data: ICV) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return instance.post<ICV>(
    `/CV/add`,
    JSON.stringify(data),
    {
      headers
    }
  );
}

export default function* addCVFetch(data: ICV) {
  try {
    const addCVsResponse: AxiosResponse<ICV> = yield axiosAddCV(data);
    yield put({ type: CVsActions.ADD_CV_RESULT, response: addCVsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
