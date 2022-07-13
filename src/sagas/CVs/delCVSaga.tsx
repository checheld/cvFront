import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';

const axiosDelCV = (payload: string) =>
  instance.delete(
    `/CVs/${payload}`
  )


export default function* delCVFetch(payload: string) {
  try {
    const delCVResponse: AxiosResponse<ICV> = yield call(axiosDelCV, payload);
    yield put({ type: CVsActions.DEL_CV_RESULT });
  }
  catch (e) {
    console.log(e)
  }
}

