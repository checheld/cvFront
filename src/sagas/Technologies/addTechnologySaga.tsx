import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';

const axiosAddTechnology = (data: Array<ITechnology>) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axios.post<any>(
    `http://localhost:3001/technologies/add`, 
    JSON.stringify(data),
      {
          headers
      }
);}

export default function* addTechnologyFetch(data: Array<ITechnology>) {
  try {
        const addTechnologiesResponse: AxiosResponse<any> = yield axiosAddTechnology(data);
        yield put({type: technologiesActions.ADD_TECHNOLOGY_RESULT, response: addTechnologiesResponse.data});
      }
  catch(e) {
    console.log(e)
  }
} 
