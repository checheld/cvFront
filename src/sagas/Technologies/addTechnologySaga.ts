import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosAddTechnology = (data: Array<ITechnology>, config: any) =>
  instance.post<Array<ITechnology>>(
    `/technologies/add`,
    data,
    config);

export default function* addTechnologyFetch(data: Array<ITechnology>) {
  try {
    const addTechnologiesResponse: AxiosResponse<Array<ITechnology>> = yield axiosAddTechnology(data, config);
    yield put({ type: technologiesActions.ADD_TECHNOLOGY_RESULT, response: addTechnologiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
