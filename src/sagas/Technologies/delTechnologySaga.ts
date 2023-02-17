import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelTechnology = (id: string, config: any) =>
  instance.delete(
    `/technologies/${id}`,
    config
  )

export default function* deltTechnologyFetch(id: string) {
  try {
    const delTechnologyResponse: AxiosResponse<ITechnology> = yield call(axiosDelTechnology, id, config);
    yield put({ type: technologiesActions.DEL_TECHNOLOGY_RESULT, response: delTechnologyResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

