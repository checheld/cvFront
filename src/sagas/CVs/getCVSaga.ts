import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getCVResult } from '../../actionCreators/CVActionCreator';
import { ICV } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetCV = (id: string, config: any) =>
  instance.get<ICV>(
    `/cvs/${id}`,
    config)

export default function* getCVFetch(id: string) {
  try {
    const getCVResponse: AxiosResponse<ICV> = yield call(axiosGetCV, id, config);
    if (getCVResponse.status === 200) {
      const response = getCVResponse.data;
      yield put(getCVResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}