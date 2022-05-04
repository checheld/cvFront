import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getCVResult } from '../../actionCreators/CVActionCreator';
import { ICV } from '../../interfaces/index'

const axiosGetCV = (id: string) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.get<ICV>(
    `http://localhost:3001/CVs/${id}`, 
      {
          headers
      }
);}

export default function* getCVFetch(id: string) {
  try{
    const getCVResponse: AxiosResponse<ICV>  = yield call(axiosGetCV, id);
    if(getCVResponse.status === 200) {
      const response = getCVResponse.data;
      yield put(getCVResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
}