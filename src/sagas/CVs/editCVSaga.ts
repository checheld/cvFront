import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ICV, IProjectCV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';

const axiosEditCV = (payload: { id: string, CVName: string, userId: string, projectCVList: IProjectCV[] }, id: number) =>

  instance.put(
    `/CVs/${id}`,
    payload
  )


export default function* editCVFetch(payload: { id: string, CVName: string, userId: string, projectCVList: IProjectCV[] }, id: number) {
  try {
    const updatCVResponse: AxiosResponse<ICV> = yield call(axiosEditCV, payload, id);
    yield put({ type: CVsActions.EDIT_CV_RESULT, response: Response });
  }
  catch (e) {
    console.log(e)
  }
}

