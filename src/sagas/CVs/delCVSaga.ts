import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelCV = (id: number, config: any) =>
  instance.delete(
    `/cvs/${id}`,
    config
  )

export default function* delCVFetch(id: number) {
  try {
    const delCVResponse: AxiosResponse<ICV> = yield call(axiosDelCV, id, config);
    yield put({ type: CVsActions.DEL_CV_RESULT, response: delCVResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

