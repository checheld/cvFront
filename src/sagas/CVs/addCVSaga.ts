import { put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { ICV } from '../../interfaces/index'
import { CVsActions } from '../../actionsTypes/CVsActionTypes';
import instance from '../axiosSetting';

const axiosAddCV = (data: ICV) =>

  instance.post<ICV>(
    `/CV/add`,
    data
  );


export default function* addCVFetch(data: ICV) {
  try {
    const addCVsResponse: AxiosResponse<ICV> = yield axiosAddCV(data);
    yield put({ type: CVsActions.ADD_CV_RESULT, response: addCVsResponse.data });
  }
  catch (e) {
    console.log(e)
  }
} 
