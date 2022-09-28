import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes'
import instance from '../axiosSetting'
import config from '../headers';

const axiosSearchCVs = (payload: string, config: any) =>

  instance.get(
    `/cvs/search/${payload}`,
    config
  )


export default function* searchCVsFetch(payload: string) {
  try {
    const searchCVsResponse: AxiosResponse<ICV[]> = yield call(axiosSearchCVs, payload, config);
    yield put({ type: CVsActions.SEARCH_CVS_RESULT, response: searchCVsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}