import { put } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';

const axiosAddTechnology = (data: Array<ITechnology>) => {

  return instance.post<Array<ITechnology>>(
    `/technologies/add`,
    data
  );
}

export default function* addTechnologyFetch(data: Array<ITechnology>) {
  try {
    const addTechnologiesResponse: AxiosResponse<Array<ITechnology>> = yield axiosAddTechnology(data);
    yield put({ type: technologiesActions.ADD_TECHNOLOGY_RESULT, response: addTechnologiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
