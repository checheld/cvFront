import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getCVsResult } from '../../actionCreators/CVActionCreator';
import { ICV } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetCVs = (config: any) =>
  instance.get<ICV[]>(
    "/cvs",
    config
  )


export default function* getCVsFetch() {
  try {
    const getCVsResponse: AxiosResponse<ICV[]> = yield call(axiosGetCVs, config);
    if (getCVsResponse.status === 200) {
      const response = getCVsResponse.data;
      yield put(getCVsResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}