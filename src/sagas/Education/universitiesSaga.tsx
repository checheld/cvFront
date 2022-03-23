import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getUniversitiesResult } from '../../actionCreators/universityActionCreator';
import { IUniversity } from '../../interfaces/index'

const axiosGetUniversities = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<IUniversity[]>(
    "http://localhost:3001/universities", 
      {
          headers
      }
);}

export default function* getUniversitiesFetch() {
  try{
    const getUniversitiesResponse: AxiosResponse<IUniversity[]>  = yield call(axiosGetUniversities);
    if(getUniversitiesResponse.status === 200) {
      const response = getUniversitiesResponse.data;
      yield put(getUniversitiesResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
} 