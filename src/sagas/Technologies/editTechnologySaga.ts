import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditTechnology = (payload: { name: string, type: string }, id: number, config: any) =>

  instance.put(
    `/technologies/${id}`,
    payload,
    config
  )


export default function* updateTechnologyFetch(payload: { name: string, type: string }, id: number) {
  try {
    const updatTechnologyResponse: AxiosResponse<ITechnology> = yield call(axiosEditTechnology, payload, id, config);
    yield put({ type: technologiesActions.EDIT_TECHNOLOGY_RESULT, response: updatTechnologyResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

