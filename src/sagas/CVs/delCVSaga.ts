import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelCV = (payload: string, config: any) =>
  instance.delete(
    `/CVs/${payload}`,
    config
  )

export default function* delCVFetch(payload: string) {
  try {
    const delCVResponse: AxiosResponse<ICV> = yield call(axiosDelCV, payload, config);
    yield put({ type: CVsActions.DEL_CV_RESULT, response: delCVResponse });
  }
  catch (e) {
    console.log(e)
  }
}

