import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';

const axiosAddCV = (data: ICV) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<ICV>(
    `http://localhost:3001/CV/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addCVFetch(data: ICV) {
  try {
        const addCVsResponse: AxiosResponse<ICV> = yield axiosAddCV(data);
        yield put({type: CVsActions.ADD_CV_RESULT, response: addCVsResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
