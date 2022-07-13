import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getCVResult } from '../../actionCreators/CVActionCreator';
import { ICV } from '../../interfaces/index'
import instance from '../axiosSetting';

const axiosGetCV = (id: string) =>
  instance.get<ICV>(
    `/CVs/${id}`)

export default function* getCVFetch(id: string) {
  try {
    const getCVResponse: AxiosResponse<ICV> = yield call(axiosGetCV, id);
    if (getCVResponse.status === 200) {
      const response = getCVResponse.data;
      yield put(getCVResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}