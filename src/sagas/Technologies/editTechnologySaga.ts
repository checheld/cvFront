import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';

const axiosEditTechnology = (payload: { name: string, type: string }, id: number) =>

  instance.put(
    `/technologies/${id}`,
    payload
  )


export default function* updateTechnologyFetch(payload: { name: string, type: string }, id: number) {
  try {
    const updatTechnologyResponse: AxiosResponse<ITechnology> = yield call(axiosEditTechnology, payload, id);
    yield put({ type: technologiesActions.EDIT_TECHNOLOGY_RESULT, response: updatTechnologyResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

