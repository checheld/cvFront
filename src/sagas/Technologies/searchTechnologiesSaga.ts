import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes'
import instance from '../axiosSetting'

const axiosSearchTechnologies = (payload: string) =>

  instance.get(
    `/technologies/search/${payload}`
  )


export default function* searchTechnologiesFetch(payload: string) {
  try {
    const searchTechnologiesResponse: AxiosResponse<ITechnology[]> = yield call(axiosSearchTechnologies, payload);
    yield put({ type: technologiesActions.SEARCH_TECHNOLOGIES_RESULT, response: searchTechnologiesResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}