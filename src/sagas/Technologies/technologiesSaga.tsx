import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getTechnologiesResult } from '../../actionCreators/technologyActionCreator';
import { ITechnology } from '../../interfaces/index'

const axiosGetTechnologies = () => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
 
  return axios.get<ITechnology[]>(
    "http://localhost:3001/technologies", 
      {
          headers
      }
);}

export default function* getTechnologiesFetch() {
  try{
    const getTechnologiesResponse: AxiosResponse<ITechnology[]>  = yield call(axiosGetTechnologies);
    if(getTechnologiesResponse.status === 200) {
      const response = getTechnologiesResponse.data;
      yield put(getTechnologiesResult(response));
    }
  }
  catch(e) {
    console.log(e)
  }
} 


