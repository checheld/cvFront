import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV, IProjectCV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosEditCV = (payload: { id: number, CVName: string, userId: number, projectCVList: IProjectCV[] }, id: number, config: any) =>

  instance.put(
    `/CVs/${id}`,
    payload,
    config
  )

export default function* editCVFetch(payload: { id: number, CVName: string, userId: number, projectCVList: IProjectCV[] }, id: number) {
  try {
    const updatCVResponse: AxiosResponse<ICV> = yield call(axiosEditCV, payload, id, config);
    yield put({ type: CVsActions.EDIT_CV_RESULT, response: updatCVResponse.data });
  }
  catch (e) {
    console.log(e)
  }
}

